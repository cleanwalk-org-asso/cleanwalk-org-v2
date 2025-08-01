// plugins/s3.ts
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import aws4 from "aws4";
import { request } from "undici";

type S3PutParams = {
  bucket: string;
  key: string;
  body: Buffer;
  contentType: string;
};

declare module "fastify" {
  interface FastifyInstance {
    s3PutObject: (params: S3PutParams) => Promise<void>;
  }
}

async function s3Plugin(fastify: FastifyInstance) {
  const region = "auto"; // ✅ Pour R2, la région est toujours "auto"
  const accessKeyId = process.env.S3_ACCESS_KEY_ID!;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY!;
  const endpoint = process.env.S3_ENDPOINT!; // ex: https://abc123.r2.cloudflarestorage.com

  if (!accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error("S3 credentials or endpoint missing");
  }

  fastify.decorate("s3PutObject", async ({ bucket, key, body, contentType }: S3PutParams) => {
    const host = new URL(endpoint).host;
    const path = `/${bucket}/${encodeURIComponent(key)}`; // ✅ R2 n'utilise pas le bucket en sous-domaine

    const signed = aws4.sign(
      {
        host,
        method: "PUT",
        path,
        service: "s3",
        region,
        headers: {
          "Content-Type": contentType,
          "Content-Length": body.length,
        },
        body,
      },
      {
        accessKeyId,
        secretAccessKey,
      }
    );

    const headers = Object.fromEntries(
      Object.entries(signed.headers || {}).filter(([_, v]) => typeof v === "string")
    ) as Record<string, string>;

    const res = await request(`${endpoint}${path}`, {
      method: "PUT",
      headers,
      body,
    });

    if (res.statusCode !== 200) {
      const errText = await res.body.text();
      throw new Error(`S3 upload failed: ${res.statusCode} - ${errText}`);
    }
  });
}

export default fp(s3Plugin, {
  name: "s3-plugin",
});
