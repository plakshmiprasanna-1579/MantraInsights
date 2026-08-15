const Order =
    require("../models/Order");


exports.createOrder =
    async (req, res) => {

        try {

            const {

                customer,
                products,
                payment

            } = req.body;


            const totalAmount =
                products.reduce(

                    (total, product) =>

                        total +
                        product.price *
                        product.quantity,

                    0

                );


            const orderId =
                "SC-" +
                Date.now();


            const order =
                new Order({

                    orderId,

                    customer,

                    products,

                    totalAmount,

                    paymentMethod:
                        payment

                });


            await order.save();


            res.status(201).json({

                success: true,

                message:
                    "Order created successfully",

                orderId:

                    order.orderId

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Unable to create order"

            });

        }

    };


exports.trackOrder =
    async (req, res) => {

        try {

            const order =
                await Order.findOne({

                    orderId:
                        req.params.orderId

                });


            if (!order) {

                return res.status(404).json({

                    message:
                        "Order not found"

                });

            }


            res.json(order);

        } catch (error) {

            res.status(500).json({

                message:
                    "Unable to track order"

            });

        }

    };