import { Type } from "@sinclair/typebox";

export const UpdateAssociationSchema = Type.Object({
  description: Type.Optional(Type.String()),
  webSite: Type.Optional(Type.String()),
  socialMedias: Type.Optional(Type.String()),
  bannerImg: Type.Optional(Type.String()),
  profilePicture: Type.Optional(Type.String()),
});

export type UpdateAssociationInput = typeof UpdateAssociationSchema;
