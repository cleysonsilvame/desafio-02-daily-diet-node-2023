import { FastifyReply, FastifyRequest } from "fastify";
import { generateTokenAndRefreshToken } from "../../utils/generate-token-and-refresh-token";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { sub } = request.user;

  return generateTokenAndRefreshToken(sub, reply);
}
