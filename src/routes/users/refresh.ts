import { FastifyReply, FastifyRequest } from "fastify";
import { generateTokenAndRefreshToken } from "../../utils/generate-token-and-refresh-token";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await (request.jwtVerify({ onlyCookie: true }) as unknown as Promise<void>);

  const { sub } = request.user;

  return generateTokenAndRefreshToken(sub, reply);
}
