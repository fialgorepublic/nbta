const User = require('../../../../models/user')
const {successResponse} = require('../../../../utils/response')
const allInvestors = async (req, res, next) => {
    const users = await User.find({role: 'investor'})
    return successResponse(res, 'All Investors', users)
}

module.exports = allInvestors