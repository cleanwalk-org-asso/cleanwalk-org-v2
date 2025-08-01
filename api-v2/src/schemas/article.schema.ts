import { Type } from "@sinclair/typebox";

export const CreateArticleSchema = Type.Object({
  title: Type.String(),
  authorId: Type.Number(),
  description: Type.String(),
  content: Type.String(),
  published: Type.Optional(Type.Boolean()),
  previewPicture: Type.Optional(Type.String()),
  categoryIds: Type.Optional(Type.Array(Type.Number()))
});

export const UpdateArticleSchema = Type.Object({
  title: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  content: Type.Optional(Type.String()),
  published: Type.Optional(Type.Boolean()),
  previewPicture: Type.Optional(Type.String()),
  categoryIds: Type.Optional(Type.Array(Type.Number()))
});

export const ArticleParamsSchema = Type.Object({
  articleId: Type.Number()
});
