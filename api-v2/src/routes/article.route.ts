import { FastifyInstance } from "fastify";
import { 
  getArticleById, 
  getAllArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle 
} from "../controllers/article.controller";
import { CreateArticleSchema, UpdateArticleSchema, ArticleParamsSchema } from "../schemas/article.schema";

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
    schema: {
      body: CreateArticleSchema
    }
  }, createArticle);

  // PUT /articles/:articleId
  fastify.put('/:articleId', {
    schema: {
      params: ArticleParamsSchema,
      body: UpdateArticleSchema
    }
  }, updateArticle);

  // DELETE /articles/:articleId
  fastify.delete('/:articleId', {
    schema: {
      params: ArticleParamsSchema
    }
  }, deleteArticle);
}
