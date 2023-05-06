import { knex } from "../database";
import { InsertMealDTO, MealDTO } from "../interfaces/meals";

export async function createMeal(meal: InsertMealDTO) {
  await knex("meals").insert(meal);
}

export async function getAllMeals() {
  return await knex<MealDTO>("meals").select();
}

