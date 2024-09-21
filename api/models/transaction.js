const mongoose = require('mongoose');  // Import mongoose
const { Schema } = mongoose;           // Destructure Schema from mongoose

// Define the Transaction Schema
const TransactionSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },  // Ensure price is a number
  description: { type: String, required: true },
  datetime: { type: Date, required: true }
});

// Create the Transaction Model
const TransactionModel = mongoose.model('Transaction', TransactionSchema);

// Export the Transaction Model
module.exports = TransactionModel;





