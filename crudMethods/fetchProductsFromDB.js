const productModel = require("../dbModels/productModel");


const fetchProductsFromDB = async () => {
    let fetchedData = undefined;
    try{
        fetchedData = await productModel.find();
        console.log("fetchedData",fetchedData);
    }catch(err){
        console.log(err);
    }
    return fetchedData;
} 

module.exports = fetchProductsFromDB;