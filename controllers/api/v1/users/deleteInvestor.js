const User = require('../../../../models/user')
const {successResponse, errorResponse} = require('../../../../utils/response')
const deleteInvestor = async(req, res, next) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)
        if (deleteUser){
            return successResponse(res, 'User deleted successfully', deleteUser)
        } else {
            return errorResponse(res, 'User Not found')
        }
    }catch(err) {
        return  errorResponse(res, err.message)
    }
}

module.exports = deleteInvestor