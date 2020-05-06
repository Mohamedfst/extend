
exports.up = function(knex, Promise) {
  return knex.schema.createTable('product', function (t) {
    t.increments('id').primary()
    t.integer('total_cents').notNullable()
    t.integer('quantity').notNullable()
  }).createTable('stripe_card', function (t) {
    t.bigincrements('id').primary()
    t.biginteger('user_id').notNullable()
    t.string('stripe_id').notNullable()
    t.string('brand').notNullable()
    t.integer('expire_month').notNullable()
    t.integer('expire_year').notNullable()
    t.string('fingerprint').notNullable()
    t.string('funding').notNullable()
    t.string('last4').notNullable()
    t.string('country').notNullable()
    t.timestamp('removed')
  }).createTable('stripe_customer', function (t) {
    t.biginteger('user_id').notNullable()
    t.string('stripe_id').notNullable()
    t.biginteger('default_card')
    t.timestamp('removed')
  }).createTable('stripe_invoice', function (t) {
    t.bigincrements('id').primary()
    t.string('stripe_id').notNullable()
    t.biginteger('user_id').notNullable()
    t.integer('total_cents').notNullable()
  }).createTable('invoice_item', function (t) {
    t.biginteger('invoice_id').notNullable()
    t.biginteger('product_id').notNullable()
    t.integer('unit_price').notNullable()
    t.integer('quantity').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('product')
    .dropTableIfExists('stripe_card')
    .dropTableIfExists('stripe_customer')
    .dropTableIfExists('stripe_invoice')
    .dropTableIfExists('invoice_item')
};
