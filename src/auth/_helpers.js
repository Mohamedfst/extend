import bcrypt from 'bcryptjs'
import knex from '../db/connection'
import logger from '../utils/loggerUtil'

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'})
  return next()
}

function generatePasswordHash(password) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function adminRequired(req, res, next) {
  if (!req.user) res.status(401).json({status: 'Please log in'})
  return knex('users').where({email: req.user.email}).first()
  .then((user) => {
    if (!user.admin) res.status(401).json({status: 'You are not authorized'})
    return next()
  })
  .catch((err) => {
    res.status(500).json({status: 'Something bad happened'})
  })
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    {status: 'You are already logged in'})
  return next()
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.email.length < 6) {
      reject({
        message: 'Email must be longer than 6 characters'
      })
    }
    else if (req.body.password.length < 6) {
      reject({
        message: 'Password must be longer than 6 characters'
      })
    } else {
      resolve()
    }
  })
}

export default {
  loginRequired,
  adminRequired,
  loginRedirect,
  generatePasswordHash,
}