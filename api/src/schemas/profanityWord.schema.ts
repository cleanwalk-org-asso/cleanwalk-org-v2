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

// Aperçu du filtre : le texte tel que le chat l'afficherait
export const TestProfanitySchema = Type.Object({
  text: Type.String({ minLength: 1, maxLength: 1000 }),
});

export const ProfanityWordParamsSchema = Type.Object({
  id: Type.Integer(),
});

export type CreateProfanityWordInput = Static<typeof CreateProfanityWordSchema>;
export type TestProfanityInput = Static<typeof TestProfanitySchema>;
