const express = require("express");

// once you have refactored this router file to
// use your data model code, instead of using
// knex directly, you can get rid of the following
// line... it's in the model file, and not
// needed here.
const db = require("../data/db-config.js");
// the knex reference above (through db-config)
// is replaced by a reference to our data model object:
// user-model.
const Users = require("./user-model.js");

const router = express.Router();

// refactored
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get users" });
  }
});

// refactored
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Could not find user with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get user" });
  }
});

// refactored
router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Users.findPosts(id);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "failed to get posts" });
  }
});

// refactored
router.post("/", async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await Users.add(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new user" });
  }
});

// NOT refactored!!!
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    // update here
    const user = await Users.update(changes, id);

    // and here
    if (user) {
      //and here
      res.json({ user });
    } else {
      res.status(404).json({ message: "Could not find user with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

// NOT refactored!!!
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // update here
    const count = await Users.remove(id);
    res.json({ message: `${count} records deleted` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
