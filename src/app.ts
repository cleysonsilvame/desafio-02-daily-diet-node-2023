import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

import { env } from "./@env";
import { onZodError } from "./middlewares/check-zod-error";
import { mealsRoutes } from "./routes/meals/routes";
import { usersRoutes } from "./routes/users/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(mealsRoutes);

onZodError(app);
