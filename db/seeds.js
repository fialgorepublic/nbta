const {connectDB} = require('../utils/connection-manager')
const User = require('../models/user')
const { use } = require('../routes/api/v1')
const mongoose = require('mongoose')
// connectDB().then(async () => {
//     const user = await new User()
//     user.first_name = 'Eric'
//     user.last_name = 'Nbtecha'
//     user.email = 'erica@nbtecha.com'
//     user.password = 11223344
//     user.role = 'admin'
//     await user.save()
//     return console.log('---------')
// })

connectDB().then(async () => {
    console.log('-------------------------db connected')
    await mongoose.model('Investment')
    const user = await mongoose.model('User').findOne()
    console.log('======User', user)
    // const user = await new User()
    // user.first_name = 'Eric'
    // user.last_name = 'Nbtecha'
    // user.email = 'erica@nbtecha.com'
    // user.password = 11223344
    // user.role = 'admin'
    // await user.save()
  })