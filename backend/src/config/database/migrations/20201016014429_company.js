exports.up = function (knex) {
  return knex.schema.createTable("companies", function (table) {
    table.increments();
    // table.string("company_id").primary();
    table.string("company_name").notNullable();
    table.string("company_cnpj").notNullable();

    //relacionamento
    table.integer("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("cascade");

    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("companies");
};
