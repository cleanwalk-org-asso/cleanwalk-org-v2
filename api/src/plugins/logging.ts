import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const loggingPlugin: FastifyPluginAsync = async (fastify) => {
  // Log toutes les requêtes entrantes
  fastify.addHook('onRequest', async (request, reply) => {
    fastify.log.info({
      method: request.method,
      url: request.url,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      timestamp: new Date().toISOString()
    }, `Incoming request: ${request.method} ${request.url}`);
  });

  // Log toutes les réponses
  fastify.addHook('onSend', async (request, reply, payload) => {
    const responseTime = reply.elapsedTime;

    fastify.log.info({
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      responseTime: responseTime ? `${responseTime}ms` : 'unknown',
      timestamp: new Date().toISOString()
    }, `Response sent: ${request.method} ${request.url} - ${reply.statusCode} (${responseTime}ms)`);
  });

  // Log les erreurs
  fastify.setErrorHandler(async (error, request, reply) => {
    fastify.log.error({
      error: {
        message: error.message,
        stack: error.stack,
        statusCode: error.statusCode || 500
      },
      method: request.method,
      url: request.url,
      timestamp: new Date().toISOString()
    }, `Error occurred: ${error.message}`);

    // Renvoyer l'erreur au handler par défaut
    throw error;
  });
};

export default fp(loggingPlugin, {
  name: 'logging-plugin'
});
