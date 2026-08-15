let products = [

{
    id:"FUR-BO-10001798",
    name:"Bush Somerset Collection Bookcase",
    category:"Furniture",
    price:261.96,
    stock:20,
    image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600"
},

{
    id:"FUR-CH-10000454",
    name:"Hon Deluxe Fabric Upholstered Chair",
    category:"Furniture",
    price:731.94,
    stock:12,
    image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
},

{
    id:"FUR-TA-10000577",
    name:"Bretford Rectangular Table",
    category:"Furniture",
    price:957.57,
    stock:8,
    image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
},

{
    id:"OFF-LA-10000240",
    name:"Self Adhesive Address Labels",
    category:"Office Supplies",
    price:14.62,
    stock:50,
    image:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600"
},

{
    id:"OFF-ST-10000760",
    name:"Eldon Fold N Roll Cart System",
    category:"Office Supplies",
    price:22.36,
    stock:25,
    image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600"
},

{
    id:"OFF-BI-10003910",
    name:"DXL Angle View Binders",
    category:"Office Supplies",
    price:18.50,
    stock:35,
    image:"https://images.unsplash.com/photo-1517842645767-c639042777db?w=600"
},

{
    id:"TEC-PH-10002275",
    name:"Mitel 5320 IP Phone",
    category:"Technology",
    price:907.15,
    stock:15,
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
},

{
    id:"TEC-AC-10001000",
    name:"Computer Accessories Kit",
    category:"Technology",
    price:129.99,
    stock:30,
    image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
},

{
    id:"TEC-MA-10000111",
    name:"Office Printer Machine",
    category:"Technology",
    price:599.99,
    stock:10,
    image:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600"
}

];



function displayProducts(list){

    const container =
    document.getElementById("product-container");

    container.innerHTML = "";

    list.forEach(product=>{

        container.innerHTML += `

        <div class="product-card glass">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-content">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    $${product.price}
                </p>

                <p>
                    Stock: ${product.stock}
                </p>

                <div class="product-actions">

                    <button
                        class="secondary-btn"
                        onclick="viewProduct('${product.id}')"
                    >
                        View Details
                    </button>

                    <button
                        class="primary-btn"
                        onclick="addToCart('${product.id}')"
                    >
                        Add Cart
                    </button>

                </div>

            </div>

        </div>

        `;
    });
}



function filterProducts(category){

    if(category==="All"){

        displayProducts(products);

    }else{

        const filtered =
        products.filter(
            p=>p.category===category
        );

        displayProducts(filtered);
    }
}



function viewProduct(id){

    const product =
    products.find(
        p=>p.id===id
    );

    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(product)
    );

    window.location.href =
    "product.html";
}



function addToCart(id){

    const product =
    products.find(
        p=>p.id===id
    );

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        product.name +
        " added to cart!"
    );
}



displayProducts(products);