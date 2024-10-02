const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    company: {
        type: String,
        required: [true, 'company must be provided'],
        enum: {
            values: ['marcos', 'liddy', 'ikea', 'caressa'],
            message: 'company not supported'
        }
    },
    rating: {
        type: Number
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)



module.exports = Product