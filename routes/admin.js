//const path = require("path");

const express = require("express");
const { body } = require("express-validator");

//const rootDir = require('../util/path');

const router = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

// /admin/add-product => GET (create new product)
router.get("/add-product", isAuth, adminController.getAddProduct);

// // /admin/products => GET (show all product to admin product pages)
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST (Start create new product)
router.post(
  "/add-product",
  [
    body("title", "Please enter a valid value!")
      .isString()
      .isLength({ min: 2 })
      .trim(),
    body("price", "Please enter a valid value!").isFloat(),
    body("description", "Please enter a valid value!")
      .isString()
      .isLength({ min: 2, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Please enter a valid value!")
      .isString()
      .isLength({ min: 2 })
      .trim(),
    body("price", "Please enter a valid value!").isFloat(),
    body("description", "Please enter a valid value!")
      .isString()
      .isLength({ min: 2, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

//router.post("/delete-product", isAuth ,adminController.postDeleteProduct);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
