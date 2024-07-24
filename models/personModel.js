const mongoose = require("mongoose");

// Defining the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  favoriteFoods: {
    type: [String], // Array of strings
    required: false,
  },
});

// Create the Person model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
