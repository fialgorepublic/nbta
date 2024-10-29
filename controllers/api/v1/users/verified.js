const User = require("../../../../models/user")
const { successResponse } = require("../../../../utils/response")
const {aysncMiddleware} = require('../../../../middlewares/async')

const verifiedInvestors = aysncMiddleware( async (req, res, next) => {
    const investors = await User.find({role: 'investor', kyc_status: 'Verified'})
    return successResponse(res, 'Verified Investors', investors)
})

module.exports = verifiedInvestors