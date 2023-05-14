import { randomUUID } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createMeal, getAllMealsByUserId } from "../../repositories/meals";

export async function listByUserId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub } = request.user;

  const meals = await getAllMealsByUserId(sub);

  return reply.status(200).send({ meals });
}
