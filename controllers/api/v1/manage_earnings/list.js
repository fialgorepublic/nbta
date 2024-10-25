const {successResponse} = require('../../../../utils/response')
const InvestmentReturn = require('../../../../models/investment_return')

const allEarnings = async (req, res, next) => {
    const user = req.currentUser
    const earnings = await InvestmentReturn.find({ investor: user }).sort({ createdAt: -1 });
    const latestEarningDate = earnings.length > 0 ? earnings[0].createdAt : null;

    return successResponse(res, 'Earnings retrieved', {
        balance: user.balance,
        date: latestEarningDate,
        earnings: earnings
    });
}

module.exports = allEarnings