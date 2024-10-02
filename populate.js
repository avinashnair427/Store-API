const Product = require('./models/productModel')
const products = require('./products.json')

const populate = async () => {
    await Product.deleteMany({})
    await Product.create(products)
}

populate()
.then(() => {
    console.log('Products added')
})
.catch(err => {
    console.log(err)
})

console.log(products.length)