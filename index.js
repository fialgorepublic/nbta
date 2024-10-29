require('./utils/dotenv')
const express = require('express')
const path = require('path')
const mongoose = require("mongoose")
const morgan = require('morgan')
const multer = require('multer');
var cors = require('cors')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, 'storage/')},
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({storage})
const apiRoutes = require('./routes/api/v1')
const {connectDB} = require('./utils/connection-manager')
const app = express()
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000}))
app.use(express.json({ limit: '50mb' }))
app.use(morgan('common'))
app.use('/storage', express.static(path.join(__dirname, './storage')))
app.use(upload.any())
app.use(cors())

app.use('/api/v1', apiRoutes)


connectDB().then(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on ${process.env.APP_PORT} port`)
  })
})

process.on('SIGINT', async() => {
  mongoose.connection.close();
  process.exit(0)
})
