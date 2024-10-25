const express = require('express')
const { create, kycDoc, getById, allInvestors, deleteInvestor, update, earningHistory, investorRecord  } = require('../../../controllers/api/v1/users')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()

app.get('/all-investors', allInvestors)
app.get('/investors-records', investorRecord)
app.get('/:id/earning-history', earningHistory)
app.get('/:id', getById)
app.delete('/:id/delete', deleteInvestor)
app.put('/:id/update', update)
app.post('/register', create)
app.post('/kyc-documents', ensureAuth, kycDoc)
module.exports = app