//In this file , we'll be loading the product Data from the users.js to the Mongo DataBase
//This logic will be called only once.

const users = require("../users");
const UserModel = require("../dbModels/UserModel");

//uploading data synchronously
var userDataLoader = async() => {
  try{
    console.log("Loading data to MLab Server from Users.js...Please wait.")

    await UserModel.remove(); 
    await UserModel.collection.insertMany(users.userData);
    console.log("Successfully Loaded all the products to MLab Server...");
  } catch(err){
    console.log("Following exception occurred :: "+err);
  }
};

module.exports = userDataLoader;
