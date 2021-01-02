const express = require('express');
const cors = require('cors');
const connection = require('./connection.js');
const fetchProductsFromDB = require('./crudMethods/fetchProductsFromDB.js');
const productDataLoader = require('./crudMethods/productDataLoader.js');
const asyncHandler = require('express-async-handler')
//using express-async-handler in  routes, instead of explicit try-catch for error handling

// making the complete express server inside async
main = async() => {
    let isDbConnected = await connection();
    console.log("Out of connection ");
    if(isDbConnected){
       // productDataLoader();
    }
    
    const app = express();
    app.use(cors());
    app.get('/api/products', asyncHandler(async(req, res) => {
      console.log("Got request to get product info");
      //need to fetch all products from DB
      let dataObj = await fetchProductsFromDB();
      res.send(dataObj);
    }));
    
    app.get('/api/products/:id', asyncHandler((req, res) => {
        console.log("Got request to get product info for id :",req.params.id);
        const product = data.products.find( x => x._id === req.params.id);
        if(product){
            res.send(product);
        }else{
            res.status(404).send({message: 'Product not found'});
        }
      }));
    
    app.get('/', asyncHandler((req, res) => {
      res.send('Server is ready');
    }));
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Serve at http://localhost:${port}`);
    });
}

main();