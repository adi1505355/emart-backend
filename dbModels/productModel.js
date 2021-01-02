//Model JS for the products
const mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
  {
  name : String,
  category : String,
  image: String,
  price : Number,
  countInStock : Number ,
  brand : String,
  rating: Number,
  numReviews : Number,
  description : String
},
{
  timestamps:true
}
);

let productModel = mongoose.model("ProductSchema",productSchema);
module.exports = productModel;
