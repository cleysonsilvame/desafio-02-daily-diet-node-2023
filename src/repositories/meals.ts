import { knex } from "../database";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { InsertMealDTO, MealDTO, UpdateMealDTO } from "../interfaces/meals";

export async function getAllMealsByUserId(userId: string) {
  return await knex<MealDTO>("meals").select().where({
    user_id: userId,
  });
}

export async function getMealById({
  id,
  user_id,
}: {
  user_id: string;
  id: string;
}) {
  const meal = await knex<MealDTO>("meals")
    .select()
    .where({
      id,
      user_id,
    })
    .first();

  if (!meal) throw new ResourceNotFoundError();

  return meal;
}

export async function getMealsStatsByUserId(userId: string) {
  const max_meals_in_diet_per_day = await knex<MealDTO>("meals")
    .select()
    .count({ total: "is_diet" })
    .where({
      user_id: userId,
      is_diet: true,
    })
    .groupBy("date")
    .orderBy("total", "desc")
    .first();

  const total_of_meals_per_diet = await knex<MealDTO>("meals")
    .select("is_diet")
    .count({ total: "is_diet" })
    .where({
      user_id: userId,
    })
    .groupBy("is_diet");

  return {
    max_meals_in_diet_per_day,
    total_of_meals_per_diet,
  };
}

export async function createMeal(meal: InsertMealDTO) {
  await knex("meals").insert(meal);
}

export async function updateMealById(
  meal: UpdateMealDTO,
  { id, user_id }: { user_id: string; id: string }
) {
  const response = await knex("meals").update(meal).where({
    id,
    user_id,
  });

  if (response !== 1) throw new ResourceNotFoundError();
}

export async function deleteMealById({
  id,
  user_id,
}: {
  user_id: string;
  id: string;
}) {
  const response = await knex("meals").delete().where({
    id,
    user_id,
  });

  if (response !== 1) throw new ResourceNotFoundError();
}
