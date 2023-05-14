import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "../../errors/resource-not-found";
import { getMealById } from "../../repositories/meals";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;
  const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

  try {
    const meal = await getMealById({
      id,
      user_id: sub,
    });

    return reply.status(200).send({ meal });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(404).send(error);

    throw error;
  }
}
