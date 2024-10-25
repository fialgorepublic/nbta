const {successResponse, errorResponse} = require('../../../../utils/response')
const Investment = require('../../../../models/investment')

const allInvestments = async (req, res, next) => {
    try {
        const investments = await Investment.find().populate('investor', 'first_name last_name')
        const formattedInvestments = investments.map(investment => ({
            ...investment._doc,
            investor: `${investment.investor.first_name} ${investment.investor.last_name}`,
            createdAt: investment.createdAt.toLocaleDateString('en-CA'), 
        }));
    return successResponse(res, 'All Investments', formattedInvestments)
  } catch (err) {
    return errorResponse(res, err)
  }
    
    
}

module.exports = allInvestments