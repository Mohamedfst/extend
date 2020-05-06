require('dotenv').config()
const env = process.env
const pg = require('pg');
const PG_BIGINT_OID = 20;
pg.types.setTypeParser(PG_BIGINT_OID, parseInt);

const knex = require('knex')
knex({
  client: 'postgresql',
  connection: {
  	  user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      database: env.POSTGRES_DB,
      password: env.POSTGRES_PASSWORD,
      port: env.POSTGRES_PORT},
  	  pool: { min: 0, max: 200 },
      warnings: false
})
export default knex
