const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 5000;

const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
const CSV_FILE = path.join(__dirname, "data", "train.csv");

// --------------------------------------------------
// CSV parser - handles commas inside quoted values
// --------------------------------------------------
function parseCSVLine(line) {
    const result = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (insideQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === "," && !insideQuotes) {
            result.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }

    result.push(current.trim());

    return result;
}

// --------------------------------------------------
// Parse complete CSV
// --------------------------------------------------
function parseCSV(text) {
    const lines = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"') {
            if (insideQuotes && text[i + 1] === '"') {
                current += '""';
                i++;
            } else {
                insideQuotes = !insideQuotes;
                current += char;
            }
        } else if ((char === "\n" || char === "\r") && !insideQuotes) {
            if (current.trim() !== "") {
                lines.push(current);
            }

            current = "";

            if (char === "\r" && text[i + 1] === "\n") {
                i++;
            }
        } else {
            current += char;
        }
    }

    if (current.trim() !== "") {
        lines.push(current);
    }

    if (lines.length < 2) {
        return [];
    }

    const headers = parseCSVLine(lines[0]).map(header =>
        header.replace(/^\uFEFF/, "").trim()
    );

    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);

        const row = {};

        headers.forEach((header, index) => {
            row[header] = values[index] ?? "";
        });

        rows.push(row);
    }

    return rows;
}

// --------------------------------------------------
// Find column ignoring case/spaces
// --------------------------------------------------
function getColumn(row, possibleNames) {
    const rowKeys = Object.keys(row);

    for (const name of possibleNames) {
        const found = rowKeys.find(
            key => key.trim().toLowerCase() === name.toLowerCase()
        );

        if (found) {
            return row[found];
        }
    }

    return "";
}

// --------------------------------------------------
// Convert dataset rows into website products
// --------------------------------------------------
function createProducts(rows) {
    const productsMap = new Map();

    rows.forEach((row, index) => {

        const productId =
            getColumn(row, [
                "Product ID",
                "ProductID",
                "Product Id",
                "product_id"
            ]) || `PRODUCT-${index + 1}`;

        const productName =
            getColumn(row, [
                "Product Name",
                "ProductName",
                "Product"
            ]) || "Retail Product";

        const category =
            getColumn(row, [
                "Category",
                "category"
            ]) || "Other";

        const subCategory =
            getColumn(row, [
                "Sub-Category",
                "Sub Category",
                "SubCategory"
            ]) || "General";

        const salesValue =
            getColumn(row, [
                "Sales",
                "Price",
                "Unit Price"
            ]);

        const quantityValue =
            getColumn(row, [
                "Quantity",
                "Qty"
            ]);

        const discountValue =
            getColumn(row, [
                "Discount"
            ]);

        const profitValue =
            getColumn(row, [
                "Profit"
            ]);

        // Convert values to numbers
        const sales = parseFloat(
            String(salesValue).replace(/[$,]/g, "")
        ) || 0;

        const quantity = parseFloat(
            String(quantityValue).replace(/[$,]/g, "")
        ) || 0;

        const discount = parseFloat(
            String(discountValue).replace(/[$,%]/g, "")
        ) || 0;

        const profit = parseFloat(
            String(profitValue).replace(/[$,]/g, "")
        ) || 0;

        // Create one product for each unique Product ID
        if (!productsMap.has(productId)) {

            productsMap.set(productId, {
                id: productId,
                productId: productId,
                name: productName,
                category: category,
                subCategory: subCategory,

                // Dataset Sales used as displayed price
                price: sales,

                sales: sales,
                quantity: quantity,
                discount: discount,
                profit: profit,

                // Used by frontend for category icon
                icon: getCategoryIcon(category)
            });
        }
    });

    return Array.from(productsMap.values());
}

// --------------------------------------------------
// Category icons
// --------------------------------------------------
function getCategoryIcon(category) {
    const value = String(category).toLowerCase();

    if (value.includes("furniture")) {
        return "🪑";
    }

    if (value.includes("office")) {
        return "📎";
    }

    if (value.includes("technology")) {
        return "💻";
    }

    return "📦";
}

// --------------------------------------------------
// Load products from CSV
// --------------------------------------------------
function loadProducts() {
    if (!fs.existsSync(CSV_FILE)) {
        throw new Error(
            `Dataset not found at: ${CSV_FILE}`
        );
    }

    const csvText = fs.readFileSync(CSV_FILE, "utf8");

    const rows = parseCSV(csvText);

    return createProducts(rows);
}

// --------------------------------------------------
// MIME types
// --------------------------------------------------
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    const types = {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon"
    };

    return types[ext] || "application/octet-stream";
}

// --------------------------------------------------
// Send JSON
// --------------------------------------------------
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
    });

    res.end(JSON.stringify(data));
}

// --------------------------------------------------
// Serve frontend files
// --------------------------------------------------
function serveFrontendFile(req, res, pathname) {

    let requestedPath = pathname;

    if (requestedPath === "/") {
        requestedPath = "/index.html";
    }

    const filePath = path.normalize(
        path.join(FRONTEND_DIR, requestedPath)
    );

    // Security check
    if (!filePath.startsWith(FRONTEND_DIR)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, data) => {

        if (error) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });

            res.end("File not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": getContentType(filePath)
        });

        res.end(data);
    });
}

// --------------------------------------------------
// Server
// --------------------------------------------------
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // -------------------------------
    // API: Health check
    // -------------------------------
    if (pathname === "/api") {
        sendJSON(res, 200, {
            success: true,
            message: "SmartCart Backend is running"
        });

        return;
    }

    // -------------------------------
    // API: Products
    // -------------------------------
    if (pathname === "/api/products") {

        try {

            const products = loadProducts();

            let filteredProducts = products;

            const category =
                parsedUrl.query.category;

            if (
                category &&
                category.toLowerCase() !== "all"
            ) {
                filteredProducts =
                    products.filter(product =>
                        product.category.toLowerCase() ===
                        category.toLowerCase()
                    );
            }

            sendJSON(res, 200, {
                success: true,
                count: filteredProducts.length,
                products: filteredProducts
            });

        } catch (error) {

            console.error(error);

            sendJSON(res, 500, {
                success: false,
                message: "Unable to load products",
                error: error.message
            });
        }

        return;
    }

    // -------------------------------
    // API: Categories
    // -------------------------------
    if (pathname === "/api/categories") {

        try {

            const products = loadProducts();

            const categories = [
                ...new Set(
                    products.map(product =>
                        product.category
                    )
                )
            ];

            sendJSON(res, 200, {
                success: true,
                categories
            });

        } catch (error) {

            sendJSON(res, 500, {
                success: false,
                message: error.message
            });
        }

        return;
    }

    // -------------------------------
    // Frontend
    // -------------------------------
    serveFrontendFile(req, res, pathname);
});

// --------------------------------------------------
// Start server
// --------------------------------------------------
server.listen(PORT, () => {

    console.log("");
    console.log("========================================");
    console.log("      SMARTCART BACKEND RUNNING");
    console.log("========================================");
    console.log(`Website : http://localhost:${PORT}`);
    console.log(`Products: http://localhost:${PORT}/api/products`);
    console.log("========================================");
    console.log("");
});