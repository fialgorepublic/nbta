const app = require('./index')
const {connectDB} = require('./utils/connection-manager')
// const port = process.env.APP_PORT

console.log('========================')
connectDB().then(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on ${process.env.APP_PORT} port`)
  })
})
