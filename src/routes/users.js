import express from 'express'
import authHelpers from '../auth/_helpers'
import utils from './utils'
import logger from '../utils/loggerUtil'

const router = express.Router()
const handleResponse = utils.handleResponse
const sanitizeBody = utils.sanitizeBody

router.get('/hey', function (req, res) {
  res.send('hello world')
})



export default router
