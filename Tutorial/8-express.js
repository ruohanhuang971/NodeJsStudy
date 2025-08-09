const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
    res.status(200).send('<h1> Home Page </h1><a href="/api/products">products</a>');
});

app.get('/api/products', (req, res) => {
    // return products without the descriptions
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image };
    })
    res.status(200).send(newProducts);
});

// give detailed descriptions after clicking on the product
// '/:productID' uses the productID it returns to specify the product so don't have
// to hard-code for each of the project a new 'app.get('...')
app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;

    const singleProduct = products.find((product) => product.id === Number(productID));
    if (!singleProduct) {
        res.status(404).send('Product Does Not Exist');
    }

    res.status(200).json(singleProduct);
});

// query param
app.get('/api/v1/query', (req, res) => {
    // console.log(req.query);
    const { search, limit } = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    };
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: [] });
    }
    res.status(200).json(sortedProducts);
});

// app.listen
app.listen(5000, () => {
    console.log(`server is live on port 5000...`);
});