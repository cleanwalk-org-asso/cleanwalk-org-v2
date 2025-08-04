import { FastifyRequest, FastifyReply } from 'fastify';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

type MultipartField = { value: string };

function isFormField(part: unknown): part is MultipartField {
  return typeof part === 'object' && part !== null && 'value' in part && typeof (part as any).value === 'string';
}

export async function uploadFileController(request: FastifyRequest, reply: FastifyReply) {
  const file = await request.file();
  if (!file) {
    return reply.status(400).send({ error: "Aucun fichier n'a été envoyé" });
  }

  const buffer = await file.toBuffer();

  // Traitement de l'image : conversion WebP + resize
  const processedBuffer = await sharp(buffer)
    .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  // Récupération du champ "folder" (optionnel)
  let folder = '';
  const rawField = file.fields?.folder;
  const field = Array.isArray(rawField) ? rawField[0] : rawField;

  if (field && isFormField(field)) {
    folder = field.value.trim().replace(/^\/+|\/+$/g, '');
  }

  const filename = `${randomUUID()}.webp`;
  const key = folder ? `${folder}/${filename}` : filename;

  const bucket = process.env.S3_BUCKET!;
  const baseUrl = process.env.S3_PUBLIC_URL!;

  try {
    await request.server.s3PutObject({
      bucket,
      key,
      body: processedBuffer,
      contentType: 'image/webp',
    });

    const url = `${baseUrl}/${key}`;
    return reply.send({
      message: "Upload réussi",
      filename,
      url,
    });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ error: "Erreur lors de l'upload" });
  }
}
