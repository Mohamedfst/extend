import  passport from 'passport';
import  init from './passport';

const LocalStrategy = require('passport-local').Strategy
const { Pool, Client } = require('pg')
require('dotenv').config();
const env = process.env

const pool = new Pool({
      user: env.POSTGRES_USER,
      host: env.POSTGRES_HOST,
      database: env.POSTGRES_DB,
      password: env.POSTGRES_PASSWORD,
      port: env.POSTGRES_PORT,
    })

const options = {
  usernameField: 'email',
  passwordField: 'password'
}

init()

passport.use(new LocalStrategy(options, (email, password, done) => {
  // check to see if the username exists
  console.log(email, password);
  var psql = "SELECT * FROM users WHERE email = $1";
  pool.query(psql, [email], (err, res) => {
    if (err){
      return done(err);
    } else {
      if (res.rows.length > 0 )
      {
        const first = res.rows[0];
        return done(null, {id: first.user_id, username: first.username, lastname: first.userlastname, store: first.storename, aws_s3: first.aws_s3})
      } else {
        return done(null, false);
      }
    }
  })
}))

export default passport
