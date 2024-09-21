const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const Transaction = require("./models/transaction")

app.use(cors({
  origin: 'https://money-tracker-murex.vercel.app/',  
  methods: ['GET', 'POST'],
  credentials: true,
}));


app.use(express.json());

const handlers = (req, res, next) => {
  console.log("Middleware executed");
  next();  
};

app.get('/api/test', (req, res) => {
  res.json({ message: "test okay3" });
});

app.post('/api/transactions', handlers, async (req, res) => {
  try {
    console.log(req.body);  

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const {name, description, datetime, price} = req.body;
    const transaction = await Transaction.create({name,description,datetime,price});

    res.json(transaction);

  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Server error occurred', error });
  }
});

app.get('/api/transactions',async(req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

// Start the server
app.listen(4040, () => {
  console.log('Server running on port 4040');
});
//iZjUIfT96JgZOJKy