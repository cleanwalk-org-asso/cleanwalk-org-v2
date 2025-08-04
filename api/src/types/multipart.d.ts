import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    file: () => Promise<MultipartFile>;
  }

  interface MultipartField {
    value: string;
    fieldname: string;
    fieldnameTruncated: boolean;
    valueTruncated: boolean;
    encoding: string;
    mimetype: string;
  }

  interface MultipartFile {
    fieldname: string;
    filename: string;
    encoding: string;
    mimetype: string;
    file: NodeJS.ReadableStream;
    fields: Record<string, MultipartField | MultipartField[]>; // 👈 ici
    toBuffer: () => Promise<Buffer>;
  }
}
