const {successResponse, errorResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const InvestmentReturn = require('../../../../models/investment_return')
const earningHistory = async (req, res, next) => {
    try {
        const { id } = req.params
      const user = await InvestmentReturn.find({investor: id}, 'earning_type return_percentage createdAt')
      return successResponse(res, 'User Details', user) 
      }catch(err){
       return errorResponse(res, err)
      }
}

module.exports = earningHistory