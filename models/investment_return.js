const mongoose = require('mongoose')
const {Schema} = mongoose

const investmentReturnSchema = new Schema({
    title: {
        type: String
    },
    earning_type: {
        type: String,
        enum: ['profit', 'loss']
    },
    return_percentage: {
        type: String
    },
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
}
)

const InvestmentReturn = mongoose.model('InvestmentReturn', investmentReturnSchema)
module.exports = InvestmentReturn