exports.up = function(knex, Promise) {
   return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('email').unique().notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('password').notNullable()
    table.boolean('admin').notNullable().defaultTo(false)
    table.integer('credits').notNullable().defaultTo(0)
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
