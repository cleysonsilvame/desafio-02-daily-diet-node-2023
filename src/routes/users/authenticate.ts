import { compare } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getUserByEmail } from "../../repositories/users";
import { generateTokenAndRefreshToken } from "../../utils/generate-token-and-refresh-token";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = createUserBodySchema.parse(request.body);

  const user = await getUserByEmail(email);

  if (!user) return reply.status(400).send({ message: "Invalid credentials" });

  const doesPasswordMatch = await compare(password, user.password_hash);

  if (!doesPasswordMatch)
    return reply.status(400).send({ message: "Invalid credentials" });

  return generateTokenAndRefreshToken(user.id, reply)
}
