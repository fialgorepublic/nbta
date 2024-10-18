const mongoose = require('mongoose')
const {Schema} = mongoose
const jwt = require('jsonwebtoken')
const {encryptPassword} = require('../utils/password')

const userSchema = new Schema({
  first_name: {
    type: String,
    index: true
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  authToken: {
    type: String
  },
  role: {
    type: String
  },
  balance: {
    type: Number
  },
  kyc_status: {
    type: String,
    enum: ['NotStarted', 'InProgress', 'Verified'],
    default: 'NotStarted'
  },
  picture: {
    type: String
  },
  kyc_docs: [
    {
      name: String,
      url: String
    }
  ],
},
{
  timestamps: true
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password')){
    this.password = await encryptPassword(this.password)
  }
  return next()
})

userSchema.methods.generateAuthToken = function () {
  const maxAge = 3 * 24 * 60 * 60
  const token = jwt.sign(
    {
      _id: this._id
    },
    process.env.APP_JWT_KEY,
    {
      expiresIn: maxAge
    }
  )
  return token
}


const User = mongoose.model('User', userSchema)

module.exports = User