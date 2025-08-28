const Product = require('../models/products');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ featured: true });
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if (featured) {           // only set this when there is a query about it
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        // $regex: instead of looking for the exact name, find any name containing query. 
        // $options: case insensitive
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (numericFilters) {
        // convert moogose syntax [$lt] to user-friendly syntax [<]
        const operatorMap = {
            '>': '$gt', '>=': '$gte', '=': '$eq', '<': '$lt', '<=': '$lte',
        }
        const regEx = /\b(<|<=|=|>|>=)\b/g; // regular expression which replaces the operators
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`); // if there is a match -> replace

        // check if filtering on certain properties
        const options = ['price', 'rating']; // properties that use number values
        filters = filters.split(',').forEach((element) => {
            const [field, operator, value] = element.split('-');
            if (options.includes(field)) { // if field is a numeric field
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    console.log(queryObject);
    let result = Product.find(queryObject);
    // sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else { // default: sort by time created
        result = result.sort('createdAt');
    }
    // limit fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    // page system
    const page = Number(req.query.page) || 1; // get either queryed page or 1
    const limit = Number(req.query.limit) || 10;
    const skips = (page - 1) * limit;
    result = result.skip(skips).limit(limit);
    // await at the end because need to chain .find().sort(), and await .find() result the array already
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
}

module.exports = { getAllProducts, getAllProductsStatic }