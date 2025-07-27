import { Type, Static } from "@sinclair/typebox";

export const CreateUserSchema = Type.Object({
  name: Type.String({ minLength: 2 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  role: Type.Union([
    Type.Literal("USER"),
    Type.Literal("ADMIN"),
    Type.Literal("ASSOCIATION"),
  ]),
  profilePicture: Type.Optional(Type.String({ format: "uri" })),
});

export type CreateUserInput = Static<typeof CreateUserSchema>;
