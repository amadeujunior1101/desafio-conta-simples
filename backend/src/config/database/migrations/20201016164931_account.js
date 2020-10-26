exports.up = function (knex) {
  return knex.schema.createTable("accounts", function (table) {
    table.increments();
    table.integer("account_bank_number").notNullable();
    table.string("account_bank_name").notNullable();
    table.string("account_agency").notNullable();
    table.integer("account_account").notNullable();
    table.string("account_digit_account").notNullable();
    table.decimal("account_balance").notNullable();

    //relacionamento
    table.integer("company_id").notNullable();
    table
      .foreign("company_id")
      .references("id")
      .inTable("companies")
      .onDelete("cascade");

    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("accounts");
};
