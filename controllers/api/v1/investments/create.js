const {successResponse, errorResponse} = require('../../../../utils/response')
const Investment = require('../../../../models/investment')
const investment = async (req, res, next) => {
  const user = req.currentUser
  const {amount} = req.body
  const userInvestment = await new Investment()
  userInvestment.amount = amount;
  userInvestment.investor = user
  await userInvestment.save()
  user.balance += Number(amount)
  await user.save()
  return successResponse(res, 'invstment created for user', userInvestment)
}

module.exports = investment