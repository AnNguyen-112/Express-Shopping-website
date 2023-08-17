//const path = require("path"); //core

const express = require("express"); //3 rd party

const shopController = require("../controllers/shop"); //file directory
const isAuth = require("../middleware/is-auth");
const { route } = require("./admin");

const router = express.Router(); //express function create small express

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.get("/checkout/success", isAuth, shopController.getCheckoutSuccess);

router.get("/checkout/cancel", isAuth, shopController.getCheckout);

router.get("/checkout", isAuth, shopController.getCheckout);

//router.post('/create-order', isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

module.exports = router;
