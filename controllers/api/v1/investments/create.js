const {successResponse, errorResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const Investment = require('../../../../models/investment')
const investment = async (req, res, next) => {
  const {investor, amount} = req.body
  console.log('investor', investor)
  const investors = await User.find({_id: {$in: investor}})
  investors.map(async (investor) => { 
    const userInvestment = await new Investment()
    userInvestment.amount = amount;
    userInvestment.investor = investor
    await userInvestment.save()
    investor.balance += Number(amount)
    await investor.save()
  })
  return successResponse(res, 'invstment created for user', [])
}

module.exports = investment