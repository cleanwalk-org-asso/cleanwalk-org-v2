import { FastifyInstance } from "fastify";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { 
  UpdateUserSchema, 
  UserResponseSchema, 
  UsersResponseSchema, 
  UserParamsSchema,
  ErrorResponseSchema 
} from "../schemas/user.schema.js";

export default async function userRoutes(app: FastifyInstance) {
  app.get("", {
    schema: {
      response: {
        200: UsersResponseSchema,
        500: ErrorResponseSchema,
      },
    },
  }, getAllUsers);

  app.get("/:id", {
    preHandler: [app.authorizeUser],
    schema: {
      params: UserParamsSchema,
      response: {
        200: UserResponseSchema,
        404: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },
  }, getUserById);

  app.put("/:id", {
    schema: {
      params: UserParamsSchema,
      body: UpdateUserSchema,
      response: {
        200: UserResponseSchema,
        404: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },
  }, updateUser);

  app.delete("/:id", {
    preHandler: [app.authorizeUser],
  }, deleteUser);  
}
