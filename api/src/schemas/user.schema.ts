import { Type, Static } from "@sinclair/typebox";

const NullableProfilePictureSchema = Type.Union([Type.String(), Type.Null()]);
const NullableEmailSchema = Type.Union([Type.String({ format: "email" }), Type.Null()]);

export const UpdateUserSchema = Type.Object({
  name: Type.Optional(Type.String({ minLength: 2 })),
  email: Type.Optional(Type.String({ format: "email" })),
  profilePicture: Type.Optional(Type.String()),
});

export const UserResponseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: NullableEmailSchema,
  role: Type.Union([
    Type.Literal("USER"),
    Type.Literal("ADMIN"),
    Type.Literal("ASSOCIATION"),
  ]),
  createdAt: Type.String({ format: "date-time" }),
  profilePicture: NullableProfilePictureSchema,
});

export const UsersResponseSchema = Type.Array(UserResponseSchema);

export const UserParamsSchema = Type.Object({
  id: Type.String({ pattern: "^[0-9]+$" }),
});

export const ErrorResponseSchema = Type.Object({
  message: Type.String(),
});

export type UpdateUserInput = Static<typeof UpdateUserSchema>;
export type UserResponse = Static<typeof UserResponseSchema>;
export type UserParams = Static<typeof UserParamsSchema>;
