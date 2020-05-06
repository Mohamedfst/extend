
exports.up = function(knex, Promise) {
  return knex.schema.createTable('promo_code', function (t) {
    t.bigincrements('id').primary()
    t.string('name').notNullable()
    t.integer('credits').notNullable()
    t.timestamp('start_time')
    t.timestamp('end_time')
    t.timestamp('removed')
    t.bool('is_new_user_only')
  }).createTable('promo_code_redemption', function (t) {
    t.integer('promo_id').notNullable()
    t.integer('user_id').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('promo_code')
    .dropTableIfExists('promo_code_redemption')
}
