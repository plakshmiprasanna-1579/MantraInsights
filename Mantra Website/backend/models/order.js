const mongoose =
    require("mongoose");


const orderSchema =
    new mongoose.Schema({

        orderId: {

            type: String,

            unique: true

        },


        customer: {

            name: String,

            email: String,

            phone: String,

            address: String,

            city: String

        },


        products: [

            {

                productId: String,

                name: String,

                price: Number,

                quantity: Number

            }

        ],


        totalAmount: Number,


        paymentMethod: String,


        status: {

            type: String,

            default: "Order Placed"

        }

    },


    {

        timestamps: true

    });


module.exports =
    mongoose.model(
        "Order",
        orderSchema
    );