const User = require('../../../../models/user')
const {successResponse, errorResponse} = require('../../../../utils/response')
const create = async (req, res, next) => {
  try{
    
  
  const {first_name, last_name, email, password, role} = req.body
  const user = await User.findOne({email: email})

  if (user) {
    return errorResponse(res, 'User already Exist')
  }
  
  const newUser = await User.create({first_name, last_name, email, password, role: 'investor'})
  return successResponse(res, 'Investor create successfully', newUser)
}
catch(err) {
  return errorResponse(res, err)
}
}

module.exports = create