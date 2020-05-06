
exports.up = function(knex, Promise) {
  return knex.schema.createTable('image', function (t) {
    t.bigincrements('id').primary()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('image')
};
