import { randomUUID } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createMeal } from "../../repositories/meals";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    is_diet: z.boolean(),
    user_id: z.string().uuid(),
  });

  const meal = createMealBodySchema.parse(request.body);

  await createMeal({ id: randomUUID(), ...meal });

  return reply.status(201).send();
}
