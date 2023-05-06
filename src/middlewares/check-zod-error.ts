import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

export async function onZodError(app: FastifyInstance) {
  app.setErrorHandler(async (error, _request, reply, ) => {   
    if (!(error instanceof ZodError)) throw error;

    reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  });
}
