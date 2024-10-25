const mongoose = require('mongoose')
const {Schema} = mongoose
const jwt = require('jsonwebtoken')
const {encryptPassword} = require('../utils/password')

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "first name is required"]
  },
  last_name: {
    type: String,
    required: [true, "last name is required"],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: async function (value) {
        if (!value.includes('@')) {
          throw new Error('Invalid Email format')
        }
        return true
      },
      message: 'Invalid email'
    },
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
  },
  authToken: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'investor'],
    message: '{VALUE} is not valid role'
  },
  balance: {
    type: Number,
    default: 0
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

userSchema.virtual('investments', {
  ref: 'Investment',
  localField: '_id',
  foreignField: 'investor'
})

userSchema.virtual('investment_returns', {
  ref: 'investment_return',
  localField: '_id',
  foreignField: 'investor'
})

const User = mongoose.model('User', userSchema)

module.exports = User