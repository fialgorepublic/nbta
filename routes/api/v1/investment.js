const express = require('express')
const {create} = require('../../../controllers/api/v1/investments')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()

app.post('/', ensureAuth, create)

module.exports = app