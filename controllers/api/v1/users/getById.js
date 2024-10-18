const {successResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const getById = async (req, res, next) => {
  const { id } = req.params
  const users = await User.findOneAndUpdate({last_name: 'Ishfaq'}, {first_name: 'Fahad'}, {new: true}).select('first_name')
    return successResponse(res, 'User Detail', users)   
}

module.exports = getById;