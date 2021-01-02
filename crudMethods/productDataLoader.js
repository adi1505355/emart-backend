//In this file , we'll be loading the product Data from the data.js to the Mongo DataBase
//This logic will be called only once.

const data = require("../data");
const productModel = require("../dbModels/productModel");

//uploading data synchronously
var productDataLoader = async() => {
  try{
    console.log("Loading data to MLab Server from Data.js...Please wait.")
    //handling the exception for outer catch instead of passing the callback method.

    await productModel.remove(); // will remove all objects from collection
    await productModel.collection.insertMany(data.products);//accepts an array
    console.log("Successfully Loaded all the products to MLab Server...");
  } catch(err){
    console.log("Following exception occurred :: "+err);
  }
};

module.exports = productDataLoader;
