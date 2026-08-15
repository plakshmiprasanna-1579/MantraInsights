const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(

    {

        productId: {

            type: String,

            required: true,

            unique: true,

            index: true

        },


        name: {

            type: String,

            required: true

        },


        category: {

            type: String,

            required: true,

            enum: [

                "Furniture",

                "Office Supplies",

                "Technology"

            ]

        },


        subCategory: {

            type: String,

            required: true

        },


        sales: {

            type: Number,

            required: true,

            default: 0

        }

    },

    {

        timestamps: true

    }

);


module.exports =
    mongoose.model(
        "Product",
        productSchema
    );