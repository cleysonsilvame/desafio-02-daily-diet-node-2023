import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { createUser } from "../../repositories/users";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const user = createUserBodySchema.parse(request.body);

  const password_hash = await hash(user.password, 6);

  await createUser({
    id: randomUUID(),
    name: user.name,
    email: user.email,
    password_hash,
  });

  return reply.status(201).send();
}
