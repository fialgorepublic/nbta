const {successResponse} = require('../../../../utils/response')
const InvestmentReturn = require('../../../../models/investment_return')
const allEarnings = async (req, res, next) => {
    const earnings = await InvestmentReturn.find().populate('investor', 'balance')
    return successResponse(res, 'Earnings create', earnings)
}

module.exports = allEarnings