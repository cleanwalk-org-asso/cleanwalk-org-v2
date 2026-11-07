import { Type, Static } from "@sinclair/typebox";

export const ProfanityWordKindSchema = Type.Union([Type.Literal("BLOCK"), Type.Literal("ALLOW")]);

export const ProfanityWordSchema = Type.Object({
  id: Type.Number(),
  value: Type.String(),
  kind: ProfanityWordKindSchema,
  createdAt: Type.String({ format: "date-time" }),
});

// Une espace dans la valeur en fait une expression de plusieurs mots.
export const CreateProfanityWordSchema = Type.Object({
  value: Type.String({ minLength: 1, maxLength: 100 }),
  kind: ProfanityWordKindSchema,
});

export const ProfanityWordParamsSchema = Type.Object({
  id: Type.Integer(),
});

export type CreateProfanityWordInput = Static<typeof CreateProfanityWordSchema>;
