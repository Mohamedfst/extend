import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import passport from "passport"
import session from "express-session"
import bodyParser from 'body-parser'
import usersRouter from './routes/users'

require('dotenv').config()

const RedisStore = require('connect-redis')(session),
  env = process.env,
  clientOrigin = `${env.CLIENT_SCHEME}${env.CLIENT_ROOT}${env.CLIENT_ORIGIN_PORT ? `:${env.CLIENT_ORIGIN_PORT}` : ""}`,
  app = express()

app.use(cors({origin: clientOrigin, credentials: true}))
app.options(clientOrigin, cors())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.set('trust proxy', true)
if (env.NODE_ENV === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'))
}
app.use(bodyParser.json());
app.use(bodyParser.json({
  limit: '2mb',
  verify:(req,res,buf)=>req.rawBody=buf
}))
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  store: new RedisStore({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  }),
  secret: env.SESSION_KEY,
  saveUninitialized: true,
  resave: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', usersRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app