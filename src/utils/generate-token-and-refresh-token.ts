import { FastifyReply } from "fastify";

export async function generateTokenAndRefreshToken(
  userId: string,
  reply: FastifyReply
) {
  const token = await reply.jwtSign(
    {},
    { sign: { sub: userId, expiresIn: "5m" } }
  );

  const refreshToken = await reply.jwtSign(
    {},
    { sign: { sub: userId, expiresIn: "7d" } }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}
