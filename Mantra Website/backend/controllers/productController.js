const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");


/* =====================================================
   CSV LOCATION
===================================================== */

const csvPath = path.join(
    __dirname,
    "..",
    "data",
    "train.csv"
);


/* =====================================================
   READ CSV
===================================================== */

function readProductsFromCSV() {

    return new Promise(
        (resolve, reject) => {

            const products = [];

            if (!fs.existsSync(csvPath)) {

                return reject(
                    new Error(
                        `train.csv not found at: ${csvPath}`
                    )
                );

            }


            fs.createReadStream(csvPath)

                .pipe(
                    csv()
                )

                .on(
                    "data",
                    (row) => {

                        const productId =
                            String(
                                row["Product ID"] || ""
                            ).trim();


                        const category =
                            String(
                                row["Category"] || ""
                            ).trim();


                        const subCategory =
                            String(
                                row["Sub-Category"] || ""
                            ).trim();


                        const productName =
                            String(
                                row["Product Name"] || ""
                            ).trim();


                        const sales =
                            parseFloat(
                                String(
                                    row["Sales"] || "0"
                                ).replace(
                                    /[^0-9.-]/g,
                                    ""
                                )
                            ) || 0;


                        if (
                            productId &&
                            category &&
                            productName
                        ) {

                            products.push({

                                productId,

                                name:
                                    productName,

                                category,

                                subCategory,

                                sales

                            });

                        }

                    }
                )

                .on(
                    "end",
                    () => {

                        resolve(
                            products
                        );

                    }
                )

                .on(
                    "error",
                    (error) => {

                        reject(
                            error
                        );

                    }
                );

        }
    );

}


/* =====================================================
   GET ALL PRODUCTS
===================================================== */

async function getProducts(
    req,
    res
) {

    try {

        const products =
            await readProductsFromCSV();


        /*
         * Each row in the CSV can represent
         * a separate transaction.
         *
         * For the product catalog, we group
         * repeated Product IDs together.
         */

        const productMap =
            new Map();


        products.forEach(
            product => {

                if (
                    productMap.has(
                        product.productId
                    )
                ) {

                    const existing =
                        productMap.get(
                            product.productId
                        );


                    existing.sales +=
                        product.sales;

                } else {

                    productMap.set(
                        product.productId,
                        {
                            ...product
                        }
                    );

                }

            }
        );


        const uniqueProducts =
            Array.from(
                productMap.values()
            );


        console.log(
            `Products loaded: ${uniqueProducts.length}`
        );


        res.json({

            success: true,

            count:
                uniqueProducts.length,

            products:
                uniqueProducts

        });

    } catch (error) {

        console.error(
            "Product error:",
            error
        );


        res.status(500)
            .json({

                success: false,

                message:
                    "Unable to load products.",

                error:
                    error.message

            });

    }

}


/* =====================================================
   GET SINGLE PRODUCT
===================================================== */

async function getProductById(
    req,
    res
) {

    try {

        const products =
            await readProductsFromCSV();


        const productId =
            decodeURIComponent(
                req.params.id
            );


        const matching =
            products.filter(
                product =>
                    product.productId ===
                    productId
            );


        if (
            matching.length === 0
        ) {

            return res
                .status(404)
                .json({

                    success: false,

                    message:
                        "Product not found."

                });

        }


        const product =
            matching[0];


        product.sales =
            matching.reduce(
                (
                    total,
                    item
                ) =>
                    total + item.sales,
                0
            );


        res.json({

            success: true,

            product

        });

    } catch (error) {

        console.error(
            error
        );


        res.status(500)
            .json({

                success: false,

                message:
                    "Unable to load product."

            });

    }

}


/* =====================================================
   GET CATEGORIES
===================================================== */

async function getCategories(
    req,
    res
) {

    try {

        const products =
            await readProductsFromCSV();


        const categories =
            [
                ...new Set(
                    products.map(
                        product =>
                            product.category
                    )
                )
            ];


        res.json({

            success: true,

            categories

        });

    } catch (error) {

        res.status(500)
            .json({

                success: false,

                message:
                    "Unable to load categories."

            });

    }

}


/* =====================================================
   EXPORT
===================================================== */

module.exports = {

    getProducts,

    getProductById,

    getCategories

};