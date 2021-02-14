//In this file , we'll be adding a new user to the Mongo DataBase

const UserModel = require("../dbModels/UserModel");

//uploading data synchronously
var addUserToDB = async (email, password) => {
    try {
        //handling the exception for outer catch instead of passing the callback method.
        const user = {
            email: email,
            password: password,
            isAdmin: false
        }
        await UserModel.collection.insertOne(user);
        console.log("Successfully Saved the User to MLab Server with Email : ",email);
    } catch (err) {
        console.log("Following exception occurred :: " + err);
        return false;
    }
    return true;
};

module.exports = addUserToDB;
