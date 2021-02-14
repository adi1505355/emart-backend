const jwt = require('jsonwebtoken');
const UserModel = require("../dbModels/UserModel");

const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || 'secretTextWrapper',
      {
        expiresIn: '30d',
      }
    );
  };

 const userAuthentication = async (emailId, password) => {
    try {
        console.log("User is :",emailId," and pass ",password);
        const user = await UserModel.findOne({ "email": emailId });
        if (user) {
            if (password.localeCompare(user.password) == 0) {
                userDetailsWithToken = {
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                }
                return userDetailsWithToken;
            }
        }
        else{
            console.log("User is :",emailId," and pass ",password);
        }
    } catch (err) {
        console.log("Following exception occurred during authentication :: " + err);
        throw err;
    }
    return undefined;
};

module.exports = userAuthentication;
