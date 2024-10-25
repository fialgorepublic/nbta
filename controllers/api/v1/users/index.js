const create = require('./create')
const kycDoc = require('./kycDoc')
const getById = require('./getById')
const allInvestors  = require('./allInvestors')
const deleteInvestor = require('./deleteInvestor')
const update = require('./update')
const earningHistory = require('./earning_history')
const investorRecord = require('./investorRecords')
module.exports = { create, kycDoc, getById, allInvestors, deleteInvestor, update, earningHistory, investorRecord }