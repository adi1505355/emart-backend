const express = require('express');
const cors = require('cors');
const connection = require('./connection.js');
const fetchProductsFromDB = require('./crudMethods/fetchProductsFromDB.js');
const productDataLoader = require('./crudMethods/productDataLoader.js');
const asyncHandler = require('express-async-handler');
const userDataLoader = require('./crudMethods/userDataLoader.js');
const userAuthentication = require('./core-utils/userAuthentication.js')
//using express-async-handler in  routes, instead of explicit try-catch for error handling
const dotenv = require('dotenv');
const addUserToDB = require('./crudMethods/addUserToDB.js');
//to fetch properties from .env file, store all required keys and declare it as early as possible in your application,
dotenv.config();
// making the complete express server inside async
main = async () => {
    let isDbConnected = await connection();
    console.log("Out of connection ");
    if (isDbConnected) {
        // productDataLoader();
        //userDataLoader();
    }

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.get('/api/products', asyncHandler(async (req, res) => {
        console.log("Got request to get product info");
        //need to fetch all products from DB
        let dataObj = await fetchProductsFromDB();
        res.send(dataObj);
    }));

    app.get('/api/products/:id', asyncHandler((req, res) => {
        console.log("Got request to get product info for id :", req.params.id);
        const product = data.products.find(x => x._id === req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    }));

    //User Registeration API Endpoint
    app.post('/user/register', asyncHandler(async (req, res) => {
        console.log("Got request to register the user :", req.body.email);
        //Saving UserDetails in DB
        let status = await addUserToDB(req.body.email, req.body.password);
        if (status) {
            let userDetailsWithJWT = await userAuthentication(req.body.email, req.body.password);
            if (userDetailsWithJWT !== undefined) {
                res.send(userDetailsWithJWT);
            } else {
                res.status(401).send({ message: 'No such User found in the DataBase' });
            }
        }

    }));

    app.get('/', asyncHandler((req, res) => {
        res.send('Server is ready');
    }));


    //SignIn API Endpoint
    app.post('/user/signin', asyncHandler(async (req, res) => {
        console.log("Got request to signin the user :", req.body.email);
        //userAuthentication will return  a promise.
        let userDetailsWithJWT = await userAuthentication(req.body.email, req.body.password);
        if (userDetailsWithJWT !== undefined) {
            res.send(userDetailsWithJWT);
        } else {
            res.status(401).send({ message: 'Invalid email or password. Please check.' });
        }
    }));

    app.get('/', asyncHandler((req, res) => {
        res.send('Server is ready');
    }));


    //for handling all the errors that we are catching using asyncHandler
    //this will send a proper error message to the client, incase any error 
    //comes during the routing requests
    // app.use((err, req, res, next) => {
    //     res.status(500).send({ message: err.message });
    // })
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Serve at http://localhost:${port}`);
    });
}

main();