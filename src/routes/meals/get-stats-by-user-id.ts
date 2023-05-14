import { randomUUID } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { createMeal, getMealsStatsByUserId } from "../../repositories/meals";
import { ResourceNotFoundError } from "../../errors/resource-not-found";

export async function getStatsByUserId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub } = request.user;

  try {
    const { total_of_meals_per_diet, max_meals_in_diet_per_day } =
      await getMealsStatsByUserId(sub);

    const { total_of_meals, total_is_diet, total_is_not_diet } =
      total_of_meals_per_diet.reduce(
        (acc, item) => {
          acc.total_of_meals += Number(item.total);

          if (item.is_diet)
            return { ...acc, total_is_diet: Number(item.total) };

          return { ...acc, total_is_not_diet: Number(item.total) };
        },
        { total_of_meals: 0, total_is_diet: 0, total_is_not_diet: 0 }
      );

    const percent_in_diet = (total_is_diet / total_of_meals) * 100;

    return reply.status(200).send({
      best_sequence: Number(max_meals_in_diet_per_day?.total),
      total_of_meals,
      total_is_diet,
      total_is_not_diet,
      percent_in_diet,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(404).send(error);

    throw error;
  }
}
