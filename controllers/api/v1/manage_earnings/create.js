const {successResponse} = require('../../../../utils/response')
const InvestmentReturn = require('../../../../models/investment_return')
const User = require('../../../../models/user')
const createEarning = async (req, res, next) => {
    const {investor, title, earning_type, return_percentage, earningFor} = req.body
    if (earningFor === 'Accumulate') {
    const investors = await User.find({role: 'investor'})
    investors.map(async(investor) => {
        const earning = await new InvestmentReturn()
        earning.investor = investor
        earning.title = title
        earning.earning_type = earning_type
        earning.return_percentage = return_percentage
        await earning.save()
    })
    } else {
        const investors = await User.find({_id: {$in: investor}})
        investors.map(async (investor) => { 
            const earning = await new InvestmentReturn()
        earning.investor = investor
        earning.title = title
        earning.earning_type = earning_type
        earning.return_percentage = return_percentage
        invester_percent = (return_percentage/100) * investor.balance
        if (earning_type == "profit"){
            investor.balance += invester_percent
        }else {
            investor.balance -= invester_percent
            
        }
        await investor.save()
        await earning.save()
          })
    }
    return successResponse(res, 'Earning create', [])
}

module.exports = createEarning