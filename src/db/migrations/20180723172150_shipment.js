
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shipment', function (t) {
    t.bigincrements('id').primary()
    t.biginteger('note_id').notNullable()
    t.biginteger('user_id').notNullable()
    t.string('first_name')
    t.string('last_name')
    t.string('street1').notNullable()
    t.string('street2')
    t.string('city').notNullable()
    t.enu('state', states).notNullable()
    t.string('zip5').notNullable()
    t.string('zip4')
    t.biginteger('preview')
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
    t.timestamp('sent')
    t.timestamp('removed')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shipment')
};

const states = [
  'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
  'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH',
  'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY',

  'AS', // american samoa
  'DC', // district of columbia
  'FM', // federated states of micronesia
  'GU', // guam
  'MH', // marshall islands
  'MP', // northern mariana islands
  'PW', // palau
  'PR', // puerto rico
  'VI', // virgin islands
  'AA', // armed forces americas (via miami)
  'AE', // armed forces europe, canada, africa, middle east (via nyc)
  'AP'  // armed forces pacific, asia (via san francisco)
]
