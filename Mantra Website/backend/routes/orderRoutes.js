const express =
    require("express");


const router =
    express.Router();


const {

    createOrder,

    trackOrder

} = require(
    "../controllers/orderController"
);


router.post(
    "/",
    createOrder
);


router.get(
    "/track/:orderId",
    trackOrder
);


module.exports = router;