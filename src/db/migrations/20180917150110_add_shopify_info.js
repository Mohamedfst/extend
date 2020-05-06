
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(t) {
    t.string('shopify_token')
    t.string('shopify_domain')
    t.string('store_domain')
    t.string('default_sender_name')
  }).createTable('campaign', function(t) {
    t.bigincrements('id').primary()
    t.biginteger('note_id').notNullable()
    t.biginteger('user_id').notNullable()
    t.string('total_orders_operator').defaultTo('any').notNullable()
    t.integer('total_orders_num').defaultTo(0).notNullable()
    t.string('total_amount_operator').defaultTo('any').notNullable()
    t.integer('total_amount_num').defaultTo(0).notNullable()
    t.integer('day_since_last_order_num').defaultTo(0).notNullable()
    t.string('tag_operator').defaultTo('any').notNullable()
    t.string('tags').defaultTo('').notNullable()
    t.string('name').defaultTo('').notNullable()
    t.integer('budget').defaultTo(0).notNullable()
    t.bool('has_promo_code').defaultTo(false).notNullable()
    t.string('promo_code_operator').defaultTo("%").notNullable()
    t.integer('promo_code_amount').defaultTo(0).notNullable()
    t.integer('promo_code_expiration').defaultTo(30).notNullable()
    t.timestamp('removed')
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
    t.bool('active').defaultTo(false)
    t.timestamp('budget_paused')
  }).alterTable('note', function(t) {
    t.boolean('is_camapaign_note').defaultTo(false)
  }).alterTable('shipment', function(t) {
    t.string('promo_code')
    t.string('promo_code_discount')
    t.string('promo_code_expiration')
    t.string('shopify_id')
  }).alterTable('invoice_item', function(t) {
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(t) {
    t.dropColumn('shopify_token')
    t.dropColumn('shopify_domain')
    t.dropColumn('store_domain')
    t.dropColumn('default_sender_name')
  })
  .alterTable('note', function(t) {
    t.dropColumn('is_camapaign_note')
  }).dropTableIfExists('campaign')
  .alterTable('shipment', function(t) {
    t.dropColumn('promo_code')
    t.dropColumn('promo_code_discount')
    t.dropColumn('promo_code_expiration')
    t.dropColumn('shopify_id')
  }).alterTable('invoice_item', function(t) {
    t.dropColumn('created_at')
  })
};
