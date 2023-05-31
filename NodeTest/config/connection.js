'use strict'

const mongoose = require('mongoose');

// Connect to MongoDB
// 
mongoose.connect('mongodb+srv://talukdarjit:zQx2SrC68ug0PYhu@cluster0.yckwzdo.mongodb.net/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('MongoDB connection state:', mongoose.connection.readyState);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });