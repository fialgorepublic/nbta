const express = require('express')
const { create, kycDoc, getById } = require('../../../controllers/api/v1/users')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()

app.post('/register', create)
app.post('/kyc-documents', ensureAuth, kycDoc)
app.get('/:id', getById)
module.exports = app