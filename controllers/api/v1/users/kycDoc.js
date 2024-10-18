const { successResponse, errorResponse } = require("../../../../utils/response")
const kycDoc = async (req, res, next) => {
  user = req.currentUser
  const pictures =  (req.files)
  if (!pictures) {
    return errorResponse(res, 'Please upload at least one document')
  }
  pictures.forEach(file => {
    if (file['fieldname'] == "picture") {
      user.picture = file['path']
    } else {
      user.kyc_status = 'InProgress'
      const existingDoc = user.kyc_docs.find(doc => doc.name === file.originalname);
      if (!existingDoc) {
        user.kyc_docs.push({ name: file.originalname, url: file.path });
      }
    }
  });
  await user.save()
  return successResponse(res, 'Kyc documents uploaded', user)
}

module.exports = kycDoc