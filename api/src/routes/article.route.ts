import { FastifyInstance } from "fastify";
import { 
  getArticleById, 
  getAllArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle 
} from "../controllers/article.controller.js";
import { CreateArticleSchema, UpdateArticleSchema, ArticleParamsSchema } from "../schemas/article.schema.js";

export async function articleRoutes(fastify: FastifyInstance) {
  // GET /articles/:articleId
  fastify.get('/:articleId', {
    schema: {
      params: ArticleParamsSchema
    }
  }, getArticleById);

  // GET /articles
  fastify.get('', getAllArticles);

  // POST /articles
  fastify.post('', {
    preHandler: [fastify.requireAdmin],
    schema: {
      body: CreateArticleSchema
    }
  }, createArticle);

  // PUT /articles/:articleId
  fastify.put('/:articleId', {
    preHandler: [fastify.requireAdmin],
    schema: {
      params: ArticleParamsSchema,
      body: UpdateArticleSchema
    }
  }, updateArticle);

  // DELETE /articles/:articleId
  fastify.delete('/:articleId', {
    preHandler: [fastify.requireAdmin],
    schema: {
      params: ArticleParamsSchema
    }
  }, deleteArticle);
}
