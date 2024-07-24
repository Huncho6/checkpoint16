const { Router } = require("express");
const {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
} = require("./controllers");

const router = Router();

router.post("/create-person", createPerson);
router.post("/create-many-people", createManyPeople);
router.get("/find-people-by-name", findPeopleByName);
router.get("/find-one-by-food", findOneByFood);
router.get("/find-by-id", findById);
router.post("/find-edit-save", findEditThenSave);
router.post("/find-and-update", findAndUpdate);
router.delete("/remove-by-id", removeById);
router.delete("/remove-many-people", removeManyPeople);
router.get("/query-chain", queryChain);

module.exports = router;
