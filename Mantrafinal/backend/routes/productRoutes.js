const express = require("express");

const router = express.Router();

const {
    getProducts,
    getProductById,
    getCategories
} = require("../controllers/productController");


/* =====================================================
   GET ALL PRODUCTS

   GET:
   /api/products
===================================================== */

router.get(
    "/",
    getProducts
);


/* =====================================================
   GET CATEGORIES

   GET:
   /api/products/categories
===================================================== */

router.get(
    "/categories",
    getCategories
);


/* =====================================================
   GET SINGLE PRODUCT

   GET:
   /api/products/:id
===================================================== */

router.get(
    "/:id",
    getProductById
);


module.exports = router;