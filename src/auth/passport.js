import passport from "passport"
const { Pool, Client } = require('pg')
require('dotenv').config();
const env = process.env

const pool = new Pool({
      user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      database: env.POSTGRES_DB,
      password: env.POSTGRES_PASSWORD,
      port: env.POSTGRES_PORT,
    });

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    var psql = "SELECT user_id FROM users WHERE user_id = $1"
  pool.query(psql, [id], (err, res) => {
    if (err){
      return done(err);
    } else {
      
      return done(null, res.rows[0]);
      
    }
  })
  })
}
