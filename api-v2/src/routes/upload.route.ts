// routes/uploadRoutes.ts
import { FastifyInstance } from "fastify";
import { uploadFileController } from "../controllers/upload.controller";

export default async function uploadRoutes(fastify: FastifyInstance) {
  fastify.post('/image', {
    schema: {
      consumes: ['multipart/form-data'],
      description: 'Upload d’un fichier image',
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            filename: { type: 'string' },
            url: { type: 'string', format: 'uri' }
          },
          required: ['message', 'filename', 'url']
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          },
          required: ['error']
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          },
          required: ['error']
        }
      }
    }
  }, uploadFileController);
}
