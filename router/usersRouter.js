// external imports
const express = require("express");
// const { check } = require("express-validator");
// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");
const {
  checkLogin,
  requiredRole,
} = require("../middlewares/common/checkLogin");

const router = express.Router();

// users page
router.get(
  "/",
  decorateHtmlResponse("Users"),
  checkLogin,
  requiredRole(["admin"]),
  getUsers
);

// add user
router.post(
  "/",
  checkLogin,
  requiredRole(["admin"]),
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
// router.post("/", avatarUpload, addUserValidationHandler, addUser);

router.delete("/:id", checkLogin, requiredRole(["admin"]), removeUser);

module.exports = router;
