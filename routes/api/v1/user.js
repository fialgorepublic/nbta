const express = require('express')
// const { create, ManagekycDoc, fetchById, allInvestors, deleteInvestor, update, investorRecord, verifyInvestors, uploadProfilePic  } = require('../../../controllers/api/v1/users')
const { create, ManagekycDoc, fetchById, list, deleteInvestor, update, dashboard, verified, manageProfilePic } = require('../../../controllers/api/v1/users')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()

app.get('/all-investors', list)
app.get('/investors-records', dashboard)
app.get('/verify-investors', verified)
app.get('/:id', fetchById)
app.delete('/:id/delete', deleteInvestor)
app.put('/:id/update', update)
app.put('/upload-picture', ensureAuth, manageProfilePic)
app.post('/register', create)
app.post('/kyc-documents', ensureAuth, ManagekycDoc)
module.exports = app