import { Type } from "@sinclair/typebox";

export const CitySchema = Type.Object({
  id: Type.Integer(),
  name: Type.String({ minLength: 1 }),
});

export const CreateCitySchema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export const UpdateCitySchema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export type City = typeof CitySchema;
export type CreateCityInput = typeof CreateCitySchema;
export type UpdateCityInput = typeof UpdateCitySchema;
