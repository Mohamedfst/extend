exports.up = function(knex, Promise) {
  return knex.schema.createTable('note', (table) => {
    table.increments()
    table.biginteger('creator').references('id').inTable('users').notNull().onDelete('cascade')
    table.string('title').notNullable().defaultTo('')
    table.string('line1').notNullable().defaultTo('')
    table.string('line2').notNullable().defaultTo('')
    table.string('line3').notNullable().defaultTo('')
    table.string('signature').notNullable().defaultTo('')
    table.string('substitution').notNullable().defaultTo('')
    table.string('sender_name').notNullable().defaultTo('')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('sent')
    table.integer('flags').notNullable().defaultTo(0)
    table.biginteger('image')
    table.biginteger('avatar')
    table.biginteger('preview')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('note')
};
