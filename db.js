const mongoose = require('mongoose');

//Define MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

//Set up MongoDB Connection
mongoose.connect(mongoURL,{
})

//Get the default connection
//Mongoose maintains a dafult connection object representing the MongoDB connection
const db = mongoose.connection;


//Define event lisners for database connection

db.on('connected',()=>{
    console.log('Connected to mongoDB server');
})

db.on('error',()=>{
    console.log('MongoDB connection error',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//Export the databse connection
module.exports = db;
