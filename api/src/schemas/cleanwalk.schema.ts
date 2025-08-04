import { Type } from "@sinclair/typebox";

export const CleanwalkSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String({ minLength: 1 }),
  pos_lat: Type.Number(),
  pos_long: Type.Number(),
  date_begin: Type.String({ format: "date-time" }),
  duration: Type.Integer(),
  description: Type.Optional(Type.String()),
  address: Type.Optional(Type.String()),
  img_url: Type.Optional(Type.String()),
  host: Type.Union([
    Type.Object({
      name: Type.String(),
      role: Type.String(), // ou Type.Enum si tu as un enum de rôles
      profilePicture: Type.String({ format: 'uri' }),
    }),
    Type.Null(),
  ]),
});

export const SoloCleanwalkSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String({ minLength: 1 }),
  pos_lat: Type.Number(),
  pos_long: Type.Number(),
  date_begin: Type.String({ format: "date-time" }),
  duration: Type.Integer(),
  description: Type.Optional(Type.String()),
  address: Type.Optional(Type.String()),
  img_url: Type.Optional(Type.String()),
  host: Type.Union([
    Type.Object({
      id: Type.Integer(),
      name: Type.String(),
      role: Type.String(), // ou Type.Enum si tu as un enum de rôles
      profilePicture: Type.String({ format: 'uri' }),
    }),
    Type.Null(),
  ]),
  participant_count: Type.Integer(),
  is_user_participant: Type.Boolean(),
});



export const CreateCleanwalkSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  pos_lat: Type.Number(),
  pos_long: Type.Number(),
  date_begin: Type.String({ format: "date-time" }),
  duration: Type.Integer(),
  description: Type.Optional(Type.String()),
  address: Type.Optional(Type.String()),
  img_url: Type.Optional(Type.String()),
  city: Type.String({ minLength: 1 }),
  user_id: Type.Integer(),
});

export const UpdateCleanwalkSchema = Type.Object({
  name: Type.Optional(Type.String({ minLength: 1 })),
  pos_lat: Type.Optional(Type.Number()),
  pos_long: Type.Optional(Type.Number()),
  date_begin: Type.Optional(Type.String({ format: "date-time" })),
  duration: Type.Optional(Type.Integer()),
  description: Type.Optional(Type.String()),
  address: Type.Optional(Type.String()),
  img_url: Type.Optional(Type.String()),
  city: Type.Optional(Type.String({ minLength: 1 })),
});

export type Cleanwalk = typeof CleanwalkSchema;
export type CreateCleanwalkInput = typeof CreateCleanwalkSchema;
export type UpdateCleanwalkInput = typeof UpdateCleanwalkSchema;
