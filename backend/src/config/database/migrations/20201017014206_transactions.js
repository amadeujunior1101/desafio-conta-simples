exports.up = function (knex) {
  return knex.schema.createTable("transactions", function (table) {
    table.increments();
    table.string("transaction_date").notNullable();
    table.decimal("transaction_value").notNullable();
    table.string("transaction_end_card");
    table.string("transaction_type").notNullable();
    table.string("transaction_description").notNullable();
    table.string("transaction_establishment");
    table.boolean("transaction_credit").notNullable();

    //relacionamento
    table.integer("account_id").notNullable();
    table
      .foreign("account_id")
      .references("id")
      .inTable("accounts")
      .onDelete("cascade");

    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
