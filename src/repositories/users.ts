import { knex } from "../database";
import { InsertUserDTO, UserDTO } from "../interfaces/users";

export async function createUser(user: InsertUserDTO) {
  await knex("users").insert(user);
}

export async function getUserByEmail(email: string) {
  return knex<UserDTO>("users").select().where("email", email).first();
}
