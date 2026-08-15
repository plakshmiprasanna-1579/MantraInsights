
# 🛒 Smart Retail Analytics & Inventory Management System

> An AI-powered e-commerce platform integrating online shopping, inventory management, workflow automation, customer support, Google Sheets, and Microsoft Power BI analytics.

---

# 📌 Project Overview

The **Smart Retail Analytics & Inventory Management System** is a modern e-commerce web application developed to provide customers with a seamless shopping experience while helping businesses analyze product performance, inventory trends, and customer behavior through business intelligence.

This project integrates **Frontend + Backend + Database + AI Automation + Power BI + n8n + Google Sheets** into one smart retail ecosystem.

---

# 🚀 Key Features

- 🛍️ Product Catalog with 3 Categories
- 🔍 Category-wise Product Filtering
- 📄 Product Details Page
- 🛒 Shopping Cart
- ⚡ Buy Now & Checkout
- 👤 Customer Details Collection
- 📦 Order Tracking
- 🤖 AI Chatbot using n8n
- ⚙️ Workflow Automation using n8n
- 📋 Automatic Order Storage in Google Sheets
- 📊 Power BI Retail Analytics Dashboard
- 📱 Fully Responsive Glassmorphism UI

---

# 🎯 Objectives

- Develop a modern e-commerce platform.
- Organize products into multiple categories.
- Provide Add to Cart and Buy Now functionality.
- Store customer orders automatically.
- Automate workflows using n8n.
- Integrate AI chatbot for customer support.
- Analyze retail data using Power BI.
- Create a responsive mobile-friendly application.

---

# 🛍️ Product Categories

The website organizes products into three major retail categories:

| Category | Description |
|----------|-------------|
| 🪑 Furniture | Chairs, Tables, Bookcases, Furnishings |
| 📎 Office Supplies | Binders, Paper, Storage, Labels, Art |
| 💻 Technology | Phones, Accessories, Machines, Copiers |

---

# 🛒 Shopping Experience

### Customer Flow

Customer → Browse Products → View Details → Add to Cart / Buy Now → Checkout → Order Confirmation

### Features

- Product Cards
- Product Details
- Quantity Management
- Shopping Cart
- Buy Now
- Checkout
- Order Tracking

---

# 👤 Customer Management

During checkout, customers provide:

- Name
- Email
- Phone Number
- Address
- Product Details
- Quantity
- Order Information

These details are automatically processed and stored through automation.

---

# ⚙️ n8n Workflow Automation

The project uses **n8n** to automate repetitive business tasks.

## Order Workflow

Customer → Website → Checkout → Backend → n8n → Google Sheets

### Automation Benefits

- Automatic order processing
- No manual data entry
- Organized customer records
- Faster workflow execution
- Easy business management

---

# 📋 Google Sheets Integration

Customer and order details are automatically stored in **Google Sheets** using n8n workflows.

### Stored Information

- Customer Name
- Email
- Phone Number
- Address
- Product Ordered
- Quantity
- Order Date

This acts as a lightweight order management database for business owners.

---

# 🤖 AI Chatbot & AI Automation

The website includes an intelligent chatbot powered through **n8n AI Automation**.

### Chatbot Capabilities

- Product recommendations
- Product information
- Order queries
- Order tracking assistance
- FAQ support
- Website navigation
- Customer support

## AI Workflow

Customer → AI Chatbot → n8n → AI Processing → Response → Customer

---

# 📊 Microsoft Power BI Analytics

Power BI transforms the retail dataset into an interactive business dashboard.

### Dashboard Insights

- 📈 Sales Analysis
- 💰 Revenue Trends
- 🛍️ Product Performance
- 📊 Category Analysis
- 📦 Inventory Insights
- 🏆 Best Selling Products
- 📅 Business Trends
- 📉 Low Performing Products

## Analytics Workflow

Retail Dataset → Data Cleaning → Power BI → Dashboard → Business Insights

The dashboard is integrated into the website through the **Analytics** page.

---

# 🧠 Smart Retail Intelligence

Unlike traditional e-commerce systems, SmartCart combines shopping, automation, AI, and analytics.

## Traditional System

Customer → Products → Cart → Checkout

## Smart Retail System

Customer → Products → Cart → Checkout → n8n → Google Sheets → Power BI

                                                     ↘ AI Chatbot

This creates a complete intelligent retail ecosystem.

---

# 🏗️ System Architecture

                    SMARTCART
                        │
                        ▼
              ┌─────────────────┐
              │    FRONTEND     │
              │ HTML • CSS • JS │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │     BACKEND     │
              │ Node.js/Express │
              └────────┬────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
            ▼                     ▼
      Product Database          n8n
            │                     │
            │             ┌───────┴────────┐
            │             │                │
            ▼             ▼                ▼
      Product Data   Google Sheets   AI Chatbot
            │             │                │
            └─────────────┼────────────────┘
                          ▼
                      Power BI
                          │
                          ▼
                 Business Analytics

---

# 💻 Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Website Structure |
| CSS3 | Glassmorphism UI |
| JavaScript | Frontend Functionality |
| Node.js | Backend Runtime |
| Express.js | REST API |
| Database | Product & Customer Data |
| n8n | Workflow Automation |
| AI | Intelligent Chatbot |
| Google Sheets | Order Storage |
| Power BI | Business Analytics |
| Git & GitHub | Version Control |

---

# 📁 Project Structure

Smart-Retail-E-Commerce/

├── frontend/

│ ├── index.html

│ ├── products.html

│ ├── product.html

│ ├── cart.html

│ ├── checkout.html

│ ├── track-order.html

│ ├── analytics.html

│ ├── css/

│ └── js/

│

├── backend/

│ ├── server.js

│ ├── package.json

│ ├── routes/

│ ├── controllers/

│ └── data/train.csv

│

├── powerbi/

├── screenshots/

└── README.md

---

# 🔄 Complete Workflow

Customer

   │

   ▼

Browse Products

   │

   ▼

Product Details

   │

   ├──────────────┐

   │              │

   ▼              ▼

Add to Cart    Buy Now

   │              │

   └──────┬───────┘

          ▼

       Checkout

          │

          ▼

     Customer Details

          │

          ▼

         n8n

          │

   ┌──────┴───────┐

   │              │

   ▼              ▼

Google Sheets  AI Chatbot

   │

   ▼

Power BI Dashboard

   │

   ▼

Business Insights

---

# 📈 Business Value

## Customer Benefits

- Easy shopping experience
- Fast product discovery
- Secure checkout
- Order tracking
- AI customer support

## Business Benefits

- Automated order management
- Customer data organization
- Sales analytics
- Product performance analysis
- Inventory insights
- Data-driven decision making

---

# 📱 Responsive Design

The website is fully responsive and optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📲 Tablet

The Glassmorphism UI automatically adapts across all screen sizes.

---

# 🎨 UI Design

The interface follows a modern **Glassmorphism** design featuring:

- Frosted glass cards
- Soft shadows
- Blur effects
- Rounded corners
- Smooth animations
- Premium user experience

---

# 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/products | Fetch Products |
| GET | /api/products/categories | Fetch Categories |
| GET | /api/products/:id | Product Details |

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_LINK
cd Smart-Retail-E-Commerce
```

## 2. Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

## 3. Frontend

Open **frontend/index.html** using **Live Server**.

---

# 📊 Dataset

The retail dataset contains information such as:

- Product ID
- Product Name
- Category
- Sub-Category
- Sales
- Retail Transaction Data

The dataset powers both the product catalog and Power BI analytics.

---

# 🧪 Testing Checklist

- Products Load Successfully
- Category Filters Work
- Product Details Open
- Add to Cart Works
- Buy Now Works
- Checkout Works
- Customer Details Stored
- Google Sheets Updated
- AI Chatbot Responds
- Power BI Dashboard Opens
- Mobile Responsive Layout Works

---

# 🌟 Future Enhancements

- AI Product Recommendation Engine
- Real-Time Inventory Monitoring
- Low Stock Alerts
- Payment Gateway Integration
- Admin Dashboard
- Machine Learning Sales Forecasting
- Personalized Shopping Experience
- Real-Time Order Notifications

---

# 👥 Team

| Name | Role |
|------|------|
| **Panta Lakshmi Prasanna** | Team Member |
| Team Member 2 | Team Member |
| Team Member 3 | Team Member |
| Team Member 4 | Team Member |

---

# 📸 Screenshots

- 🏠 Home Page
- 🛍️ Products Page
- 🛒 Cart & Checkout
- 📊 Power BI Dashboard

---

# 🔗 Project Links

**Live Website:** YOUR_WEBSITE_LINK

**Power BI Dashboard:** YOUR_POWERBI_LINK

---

# 🙏 Acknowledgement

We sincerely thank our faculty members and project guide for their continuous guidance and support throughout the development of this project. We also acknowledge the technologies that made this project possible, including HTML, CSS, JavaScript, Node.js, Express.js, n8n, Google Sheets, Microsoft Power BI, Git, and GitHub.

---

# 🏁 Conclusion

The **Smart Retail Analytics & Inventory Management System** demonstrates how modern e-commerce can be enhanced with **AI automation, workflow automation, business intelligence, and data-driven decision making**. By integrating shopping, customer management, Power BI analytics, Google Sheets automation, and AI chatbot support, SmartCart creates a complete intelligent retail solution for both customers and businesses.

---
