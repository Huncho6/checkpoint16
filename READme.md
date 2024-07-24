//this work contains the following
** a .env file: where the connection string gotten from mongo compass
** a schema file
**the main app which is the check16.js file
** the db.js file for handling connections to the database
** a contollers.js file that is used to handle the crud operations in the project
** a router.js file that makes it possible to test the end point though they're alternatives to using the file

//this is an alternative to using the one in the code//saved for future purpose
//this is done when in alternative to using the router file
const express = require("express");
const Person = require("./models/personModel");

const router = express.Router();

// Create and Save a Record of a Model
router.post("/create-person", async (req, res) => {
try {
const newPerson = new Person(req.body);
const data = await newPerson.save();
res.status(201).send(data);
} catch (err) {
res.status(500).send(err);
}
});

// Create Many Records with model.create()
router.post("/create-many-people", async (req, res) => {
try {
const people = await Person.create(req.body);
res.status(201).send(people);
} catch (err) {
res.status(500).send(err);
}
});

// Find People by Name
router.get("/find-people-by-name", async (req, res) => {
try {
const people = await Person.find({ name: req.query.name });
res.status(200).send(people);
} catch (err) {
res.status(500).send(err);
}
});

// Find One Person by Food
router.get("/find-one-by-food", async (req, res) => {
try {
const person = await Person.findOne({ favoriteFoods: req.query.food });
res.status(200).send(person);
} catch (err) {
res.status(500).send(err);
}
});

// Find Person by ID
router.get("/find-by-id", async (req, res) => {
try {
const person = await Person.findById(req.query.id);
res.status(200).send(person);
} catch (err) {
res.status(500).send(err);
}
});

// Find, Edit, Then Save
router.post("/find-edit-save", async (req, res) => {
try {
const person = await Person.findById(req.body.id);
person.favoriteFoods.push("hamburger");
const updatedPerson = await person.save();
res.status(200).send(updatedPerson);
} catch (err) {
res.status(500).send(err);
}
});

// Find and Update
router.post("/find-and-update", async (req, res) => {
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
});

// Remove Person by ID
router.delete("/remove-by-id", async (req, res) => {
try {
const removedPerson = await Person.findByIdAndRemove(req.body.id);
res.status(200).send(removedPerson);
} catch (err) {
res.status(500).send(err);
}
});

// Remove Many People
router.delete("/remove-many-people", async (req, res) => {
try {
const result = await Person.deleteMany({ name: req.body.name });
res.status(200).send(result);
} catch (err) {
res.status(500).send(err);
}
});

// Chain Search Query Helpers
router.get("/query-chain", async (req, res) => {
try {
const data = await Person.find({ favoriteFoods: "burritos" })
.sort({ name: 1 })
.limit(2)
.select("-age");
res.status(200).send(data);
} catch (err) {
res.status(500).send(err);
}
});

module.exports = router;
