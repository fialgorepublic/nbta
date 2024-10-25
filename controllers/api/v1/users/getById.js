const {successResponse, errorResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const getById = async (req, res, next) => {
  try {
    const { id } = req.params
  const user = await User.findOne({_id: id})
  return successResponse(res, 'User Details', user) 
  }catch(err){
   return errorResponse(res, err)
  }
}

module.exports = getById;