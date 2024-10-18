const User = require('../../../../models/user')
const {successResponse, errorResponse} = require('../../../../utils/response')
const create = async (req, res, next) => {
  const {first_name, last_name, email, password, role} = req.body
  const user = await User.findOne({email: email})

  if (user) {
    return res.status(200).send({message: 'User already Exist', data: null})
  }
  
  const newUser = await User.create({first_name, last_name, email, password, role})
  // newUser.first_name = first_name
  // newUser.last_name = last_name
  // newUser.email = email
  // newUser.password = password
  // newUser.role = role
  // const userRes = await newUser.save()
  return successResponse(res, 'Investor create successfully', newUser)
}

module.exports = create