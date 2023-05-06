import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", table => {
    table.uuid("id", { primaryKey: true });
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.datetime("date").notNullable();
    table.boolean("is_diet").notNullable();

    table.uuid("user_id").notNullable().references("id").inTable("users");

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals");
}
