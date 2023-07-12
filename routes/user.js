const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.get("/", UserController.findAllUsers);
router.get("/:id", UserController.findOneUser);
router.post("/signup", UserController.createUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// create one for login 
router.post("/login", UserController.loginUser);

module.exports = router;