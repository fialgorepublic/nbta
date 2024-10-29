const { successResponse, errorResponse } = require("../../../../utils/response")
const {aysncMiddleware} = require('../../../../middlewares/async')

const uploadProfilePic = aysncMiddleware( async (req, res, next) => {
    // const user = req.currentUser
    // const picture =  (req.files)
    const { currentUser: user, files: picture } = req;
  
  if (!picture) {
    return errorResponse(res, 'Please upload at least one document')
  }
    user.profile_picture =  picture[0].path
    await user.save()
    return successResponse(res, 'Profile Picture updated', user)
})

module.exports = uploadProfilePic