
const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

// create one for admin login 
router.post("/adminlogin", UserController.adminLogin);

router.post("/adminsignup", UserController.adminSignup);

router.get("/admin", UserController.findAllAdmins);


module.exports = router;