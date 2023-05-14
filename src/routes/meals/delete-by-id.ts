import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "../../errors/resource-not-found";
import { deleteMealById } from "../../repositories/meals";

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;

  const { id } = z.object({ id: z.string().uuid() }).parse(request.params);

  try {
    await deleteMealById({
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
