const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const User = require("../models/user");
//const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  // body("email", "Please enter a valid email!").isEmail().normalizeEmail(),
  // body("password", "Password has to be valid!").isLength({ min: 1 }),
  // .isAlphanumeric()
  // .trim(),
  authController.postLogin
);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      //   if (value === "test@test.com") {
      //     throw new Error("This email adress is forbidden.");
      //   }
      //   return true;
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email is already exists.");
        }
      });
    })
    .normalizeEmail(),
  // body(
  //   "password",
  //   "Please enter a valid numeric password with more than 1 character" // error message
  // ).isLength({ min: 1 }),
  // body("confirmPassword")
  //   .custom((value, { req }) => {
  //     if (value !== req.body.password) {
  //       throw new Error("Password have to match");
  //     }
  //   })
  //   .trim(),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword); //new-password

router.post("/new-password", authController.postNewPassword); //after post new-password

module.exports = router;
