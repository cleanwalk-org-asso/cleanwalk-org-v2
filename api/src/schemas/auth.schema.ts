import { Type, Static } from "@sinclair/typebox";

export const CreateUserSchema = Type.Object({
  name: Type.String({ minLength: 2 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  role: Type.Union([
    Type.Literal("USER"),
    Type.Literal("ASSOCIATION"),
  ]),
  profilePicture: Type.Optional(Type.String()),
});

export const LoginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});


export const ForgotPasswordSchema = Type.Object({
  email: Type.String({ format: "email" }),
});

export const ResetPasswordSchema = Type.Object({
  token: Type.String(),
  password: Type.String({ minLength: 8 }),
});

export type ForgotPasswordInput = Static<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = Static<typeof ResetPasswordSchema>;

export type CreateUserInput = Static<typeof CreateUserSchema>;
export type LoginInput = Static<typeof LoginSchema>;
