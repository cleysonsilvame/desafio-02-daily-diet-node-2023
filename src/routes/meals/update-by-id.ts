import { randomUUID } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createMeal, updateMealById } from "../../repositories/meals";
import { ResourceNotFoundError } from "../../errors/resource-not-found";

export async function updateById(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;

  const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

  const updateMealBodySchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    date: z.coerce.date().optional(),
    is_diet: z.boolean().optional(),
  });

  const meal = updateMealBodySchema.parse(request.body);

  try {
    await updateMealById(meal, {
      id,
      user_id: sub,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(404).send(error);

    throw error;
  }

  return reply.status(204).send();
}
