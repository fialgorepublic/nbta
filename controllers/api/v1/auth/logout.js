const {successResponse} = require('../../../../utils/response')
const logout = async (req, res, next) => {
    const user = req.currentUser
    user.authToken = ""
    user.save()
    return successResponse(res, 'User Logged out successfully', user)
}

module.exports = logout