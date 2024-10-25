const {successResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const update = async (req, res, next) => {
    const { id } = req.params
    const { first_name, last_name, email, password, kyc_status} = req.body
    const user = await User.findByIdAndUpdate({_id: id}, {$set: {first_name, last_name, email, password, kyc_status}}, {new: true})
    if (user) {
        return successResponse(res, 'Investor update successfully', user)
    }
}

module.exports = update