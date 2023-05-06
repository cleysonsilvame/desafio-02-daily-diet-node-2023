import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", table => {
    table
      .uuid("id", { primaryKey: true })
    table.text("name").notNullable();
    table.text("email").notNullable().unique();
    table.text("password_hash").notNullable();
    
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
