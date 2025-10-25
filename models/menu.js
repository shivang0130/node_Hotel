const mongoose = require('mongoose');

const menuShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ['Sweet', 'Spicy', 'Sour'],
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  }
});

const MenuItem = mongoose.model('MenuItem',menuShema);
module.exports=MenuItem;