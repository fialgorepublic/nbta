const mongoose = require('mongoose')
const Schema = mongoose

const tradeResultSchema = new Schema({
  title: {
    type: String
  },
  value: {
    type: Number
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamp: true
}
)

const TradeResult = mongoose.model('TradeResult', tradeResultSchema)
module.exports = TradeResult