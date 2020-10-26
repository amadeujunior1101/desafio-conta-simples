exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("user_name").notNullable();
    table.string("user_cpf").notNullable();
    table.string("user_email").notNullable().unique();
    table.string("user_cell_phone").notNullable();
    table.string("user_password").notNullable();

    table.timestamps();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
