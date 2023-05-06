import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt";
import { getAllMeals } from "../../repositories/meals";

import { create } from "./create";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post("/meals", create);

  app.get("/meals", async (request, reply) => {
    const meals = await getAllMeals();

    return reply.status(200).send({ meals });
  });
}
