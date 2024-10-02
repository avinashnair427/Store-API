const Product = require('./../models/productModel')

const filterOptions = ['price','rating']
const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte'
}
const regularExp = /\b(<|<=|=|>=|>)\b/g

exports.getAllProducts = async (req,res,next) => {
    
    let { name, company, featured, numFilter, fields, sort, productsPerPage, pageNo } = req.query
    const queryObj = {}

    if(name){
        queryObj.name = { $regex: name, $options: 'i' }
    }

    if(company){
        queryObj.company = company
    }

    if(featured){
        queryObj.featured = featured === 'true' ? true : false
    }

    if(numFilter){
        numFilter = numFilter.replace(regularExp, match => `-${operatorMap[match]}-`).split(',')
        numFilter.forEach(numFilter => {
            [field, operator, value] = numFilter.split('-')
            if(filterOptions.includes(field)){
                queryObj[field] = {[operator]: Number(value)}
            }
        })
    }

    let result = Product.find(queryObj)
    
    if(sort){
        sort = sort.split(',').join(' ')
    }
    else{
        sort = 'createdAt'
    }
    result = result.sort(sort)

    if(fields){
        fields = fields.split(',').join(' ')
    }
    result = result.select(fields)

    let skip = (pageNo - 1) * productsPerPage

    result = result.skip(skip).limit(productsPerPage)

    const products = await result
    res.status(200).json({
        status: 'success',
        data: products
    })
}