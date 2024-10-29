const { successResponse } = require('../../../../utils/response')
const InvestmentReturn = require('../../../../models/investment_return')
const User = require('../../../../models/user')
const { aysncMiddleware } = require('../../../../middlewares/async')

const createEarning = aysncMiddleware(async (req, res, next) => {
    const { investor, earning_type, return_percentage, earningFor } = req.body

    if (earningFor === 'Accumulate') {
        const investors = await User.find({ role: 'investor', kyc_status: 'Verified' })
        investors.map(async (investor) => {
            await createInvestmentReturn(investor, earning_type, return_percentage)
        })
    } else {
        const investors = await User.find({ _id: { $in: investor } })
        investors.map(async (investor) => {
            await createInvestmentReturn(investor, earning_type, return_percentage)
        })
    }
    return successResponse(res, 'Earning create', [])
})

const createInvestmentReturn = async (investor, earning_type, return_percentage) => {
    const earning = await new InvestmentReturn()
    earning.investor = investor
    earning.earning_type = earning_type
    earning.return_percentage = return_percentage
    earning.before_earning = investor.balance
    invester_percent = (return_percentage / 100) * investor.balance
    if (earning_type == "profit") {
        investor.balance += invester_percent
    } else {
        investor.balance -= invester_percent
    }
    earning.after_earning = investor.balance
    await investor.save()
    await earning.save()
}

module.exports = createEarning