import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt";

import { create } from "./create";
import { deleteById } from "./delete-by-id";
import { getById } from "./get-by-id";
import { getStatsByUserId } from "./get-stats-by-user-id";
import { listByUserId } from "./list-by-user-id";
import { updateById } from "./update-by-id";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/meals", listByUserId);
  app.get("/meals/stats", getStatsByUserId);
  app.get("/meals/:id", getById);
  app.post("/meals", create);
  app.patch("/meals/:id", updateById);
  app.delete("/meals/:id", deleteById);
}
