const mongoose = require('mongoose');

//Define Person Schema
const personShema  = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type:Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }
})

//Create Person model
const Person = mongoose.model('Person', personShema);
module.exports=Person;