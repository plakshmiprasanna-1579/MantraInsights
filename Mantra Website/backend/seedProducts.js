const fs =
    require("fs");

const path =
    require("path");

const csv =
    require("csv-parser");

const dotenv =
    require("dotenv");

const connectDB =
    require("./config/db");

const Product =
    require("./models/Product");


dotenv.config();


/* =========================================================
   IMPORT PRODUCTS FROM CSV
   ========================================================= */

async function importProducts() {

    await connectDB();


    const csvPath =
        path.join(
            __dirname,
            "data",
            "train.csv"
        );


    const productsMap =
        new Map();


    fs.createReadStream(
        csvPath
    )

    .pipe(
        csv()
    )

    .on(
        "data",
        row => {

            const productId =
                row["Product ID"];


            const category =
                row["Category"];


            const subCategory =
                row["Sub-Category"];


            const productName =
                row["Product Name"];


            const sales =
                Number(
                    row["Sales"]
                );


            if (
                !productId ||
                !category ||
                !subCategory ||
                !productName
            ) {

                return;

            }


            /*
             * If a product appears
             * multiple times in the dataset,
             * combine its sales.
             */

            if (
                productsMap.has(
                    productId
                )
            ) {

                const existing =
                    productsMap.get(
                        productId
                    );


                existing.sales +=
                    sales;

            } else {

                productsMap.set(
                    productId,
                    {

                        productId,

                        name:
                            productName,

                        category,

                        subCategory,

                        sales

                    }
                );

            }

        }
    )

    .on(
        "end",
        async () => {

            try {

                const products =
                    Array.from(
                        productsMap.values()
                    );


                await Product.deleteMany();


                await Product.insertMany(
                    products
                );


                console.log(
                    `Imported ${products.length} unique products successfully.`
                );


                process.exit();

            } catch (error) {

                console.error(
                    "Import error:",
                    error
                );


                process.exit(1);

            }

        }
    );

}


importProducts();