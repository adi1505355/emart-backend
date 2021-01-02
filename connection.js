//In this module we are establishing the connection to DB Server on mlab
const mongoose = require('mongoose');

var connection = () => {
  console.log("Connecting to MLab Servers...");
  const connection_url = 'mongodb+srv://admin:04bNsLK46uP6aEFK@cluster0.n2ycu.mongodb.net/emartDB?retryWrites=true&w=majority'

  //db config
  try {
    mongoose.connect(connection_url, {
      useNewUrlParser: true, //all these to avoid deprecation warnings
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log("Connection successful to the DB Server:: ");
  } catch (error) {
    console.log("Connection failed with the following error :: " + error);
    return false;
  }
  return true; //connection was successful
};

module.exports = connection;
