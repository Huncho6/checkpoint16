const mongoose = require("mongoose");
const Person = require("./models/personModel");

// Create and Save a Record of a Model
exports.createPerson = async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const data = await newPerson.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create Many Records with model.create()
exports.createManyPeople = async (req, res) => {
  try {
    const people = await Person.create(req.body);
    res.status(201).send(people);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find People by Name
exports.findPeopleByName = async (req, res) => {
  try {
    const people = await Person.find({ name: req.query.name });
    res.status(200).send(people);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find One Person by Food
exports.findOneByFood = async (req, res) => {
  try {
    const person = await Person.findOne({ favoriteFoods: req.query.food });
    res.status(200).send(person);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find Person by ID
exports.findById = async (req, res) => {
  try {
    const person = await Person.findById(req.query.id);
    res.status(200).send(person);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find, Edit, Then Save
exports.findEditThenSave = async (req, res) => {
  try {
    const person = await Person.findById(req.body.id);
    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    res.status(200).send(updatedPerson);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Find and Update
exports.findAndUpdate = async (req, res) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: req.body.name },
      { age: 20 },
      { new: true }
    );
    res.status(200).send(updatedPerson);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Remove Person by ID
exports.removeById = async (req, res) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(req.body.id);
    res.status(200).send(removedPerson);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Remove Many People
exports.removeManyPeople = async (req, res) => {
  try {
    const result = await Person.deleteMany({ name: req.body.name });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Chain Search Query Helpers
exports.queryChain = async (req, res) => {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};
