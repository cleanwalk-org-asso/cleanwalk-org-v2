import { Type } from "@sinclair/typebox";

const CleanwalkHostSchema = Type.Object({
  name: Type.String(),
  role: Type.String(),
  profilePicture: Type.Union([Type.String(), Type.Null()]),
});

const SoloCleanwalkHostSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  role: Type.String(),
  profilePicture: Type.Union([Type.String(), Type.Null()]),
});

export const CleanwalkParticipantUserSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  profilePicture: Type.Union([Type.String(), Type.Null()]),
  nb_person: Type.Integer({ minimum: 1 }),
});

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
  host: Type.Union([CleanwalkHostSchema, Type.Null()]),
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
  host: Type.Union([SoloCleanwalkHostSchema, Type.Null()]),
  participant_count: Type.Integer(),
  participant_count_public: Type.Boolean(),
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
  participant_count_public: Type.Optional(Type.Boolean()),
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
  participant_count_public: Type.Optional(Type.Boolean()),
  city: Type.Optional(Type.String({ minLength: 1 })),
});

export type Cleanwalk = typeof CleanwalkSchema;
export type CreateCleanwalkInput = typeof CreateCleanwalkSchema;
export type UpdateCleanwalkInput = typeof UpdateCleanwalkSchema;
