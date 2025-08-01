import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Static } from "@sinclair/typebox";
import { CreateArticleSchema, UpdateArticleSchema, ArticleParamsSchema } from "../schemas/article.schema";

const prisma = new PrismaClient();

export async function getArticleById(
  req: FastifyRequest<{ Params: Static<typeof ArticleParamsSchema> }>,
  reply: FastifyReply,
) {
  try {
    const { articleId } = req.params;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!article) {
      return reply.status(404).send({ message: 'Article not found' });
    }

    const categoryIds = article.categories.map(cat => cat.categoryId);

    const articleData = {
      id: article.id,
      title: article.title,
      description: article.description,
      content: article.content,
      createdAt: article.createdAt,
      categoryIds,
      previewPicture: article.previewPicture,
      author: article.author
    };

    return reply.send(articleData);
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' });
  }
}

export async function getAllArticles(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const articles = await prisma.article.findMany({
      include: {
        categories: {
          include: {
            category: true
          }
        },
        author: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const articlesData = articles.map(article => ({
      id: article.id,
      title: article.title,
      authorId: article.authorId,
      description: article.description,
      content: article.content,
      createdAt: article.createdAt,
      published: article.published,
      previewPicture: article.previewPicture,
      categories: article.categories.map(cat => cat.category.category),
      author: article.author
    }));

    return reply.send(articlesData);
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' });
  }
}

export async function createArticle(
  req: FastifyRequest<{ Body: Static<typeof CreateArticleSchema> }>,
  reply: FastifyReply,
) {
  try {
    const data = req.body;

    const article = await prisma.article.create({
      data: {
        title: data.title,
        authorId: data.authorId,
        description: data.description,
        content: data.content,
        published: data.published ?? false,
        previewPicture: data.previewPicture,
        categories: data.categoryIds ? {
          create: data.categoryIds.map(categoryId => ({
            categoryId
          }))
        } : undefined
      }
    });

    return reply.status(201).send({ message: 'Article created successfully', id: article.id });
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' });
  }
}

export async function updateArticle(
  req: FastifyRequest<{ 
    Params: Static<typeof ArticleParamsSchema>;
    Body: Static<typeof UpdateArticleSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const { articleId } = req.params;
    const data = req.body;

    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId }
    });

    if (!existingArticle) {
      return reply.status(404).send({ message: 'Article not found' });
    }

    // Update categories if provided
    if (data.categoryIds) {
      await prisma.categoryArticle.deleteMany({
        where: { articleId }
      });

      await prisma.categoryArticle.createMany({
        data: data.categoryIds.map(categoryId => ({
          articleId,
          categoryId
        }))
      });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        published: data.published,
        previewPicture: data.previewPicture
      }
    });

    return reply.send({ message: 'Article updated successfully' });
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' });
  }
}

export async function deleteArticle(
  req: FastifyRequest<{ Params: Static<typeof ArticleParamsSchema> }>,
  reply: FastifyReply,
) {
  try {
    const { articleId } = req.params;

    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId }
    });

    if (!existingArticle) {
      return reply.status(404).send({ message: 'Article not found' });
    }

    await prisma.article.delete({
      where: { id: articleId }
    });

    return reply.send({ message: 'Article deleted successfully' });
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' });
  }
}
