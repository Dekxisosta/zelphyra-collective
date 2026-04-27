
<img src="/assets/images/logo-dark.png" width="260px"/>

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000000)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=ffffff)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=ffffff)
![Lucide React](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=ffffff)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=ffffff)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=ffffff)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=ffffff)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=ffffff)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=ffffff)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=ffffff)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=ffffff)
![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=ffffff)
![ZZZ](https://img.shields.io/badge/Zenless_Zone_Zero-C8FF00?style=for-the-badge&logo=hoyoverse&logoColor=000000)

A clean, fast, and distraction-free eCommerce platform focused on what matters — the product and the experience.

## Disclaimer

This website is not affiliated with, endorsed by, or associated with HoYoverse or miHoYo in any way.
All HoYoverse-related imagery, characters, and assets used on this site are the intellectual property of HoYoverse / miHoYo Co., Ltd.
and are used solely for design portfolio and showcase purposes. No commercial use is intended.

## Overview

Zenless Collective started as a simple idea — build a smooth, responsive, and intentional shopping experience.
No clutter, no noise, just a focused interface and curated products.

Built with a modern React frontend and a robust Laravel backend, it covers the full e-commerce loop:
browsing and filtering products, viewing detailed product pages, and a complete admin panel for managing
inventory, orders, payments, and customers — all in one place.

This project was built to explore and practice real-world full-stack development patterns, including
API mocking with MSW during frontend development, server state management with TanStack Query,
and clean UI composition with TailwindCSS and Lucide React.


---
![WebpageMockImage](/assets/images/dashboard-preview.png)
---
![WebpageMockImage](/assets/images/signup-preview.png)
---

## Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/162527652?v=4" width="80" style="border-radius:50%;" /><br/>
      <b>SHUBARUUU</b><br/>
      <small>API Backend </small>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/201718391?v=4" width="80" style="border-radius:50%;" /><br/>
      <b>Dekxisosta</b><br/>
      <small>Frontend / UI</small>
    </td>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/152399880?v=4" width="80" style="border-radius:50%;" /><br/>
        <b>rjtchn</b><br/>
        <small>Auth / Security</small>
    </td>
    <td align="center">
      <img src="https://ui-avatars.com/api/?name=Mathigy" width="80" style="border-radius:50%;" /><br/>
      <b>Mathigy</b><br/>
      <small>Design / Docu</small>
    </td>
    <td align="center">
      <img src="https://ui-avatars.com/api/?name=Kim" width="80" style="border-radius:50%;" /><br/>
      <b>Kim</b><br/>
      <small>Testing / Docu</small>
    </td>
  </tr>
</table>

## Features
 
### Admin

| # | Feature | Description | Route | Endpoint |
|---|---------|-------------|-------|----------|
| 1 | Dashboard | Overview of key metrics and store statistics | `/admin/dashboard` | `GET /api/admin/dashboard` |
| 2 | Inventory Management | Track and manage product stock levels | `/admin/inventory` | `GET /api/admin/inventory` |
| 3 | Product Management | Add, edit, and manage product listings | `/admin/products` | `GET /api/admin/products` `POST /api/admin/products` `PUT /api/admin/products/:id` `DELETE /api/admin/products/:id` |
| 4 | Order Management | View and process incoming orders | `/admin/orders` | `GET /api/admin/orders` `PATCH /api/admin/orders/:id/status` |
| 5 | Order History | View past and completed orders | `/admin/orders/history` | `GET /api/admin/orders/history` |
| 6 | Payment Management | Track and manage payment records | `/admin/payments` | `GET /api/admin/payments` `GET /api/admin/payments/:id` |
| 7 | Customer Management | View and manage customer accounts | `/admin/customers` | `GET /api/admin/customers` `GET /api/admin/customers/:id` `DELETE /api/admin/customers/:id` |
| 8 | Customer Cart | Monitor customer cart activity | `/admin/customers/:id/cart` | `GET /api/admin/customers/:id/cart` |
| 9 | Customer Order History | View order history per individual customer | `/admin/customers/:id/orders` | `GET /api/admin/customers/:id/orders` |

### User

| # | Feature | Description | Route | Endpoint |
|---|---------|-------------|-------|----------|
| 1 | Products Page | Browse all available products | `/products` | `GET /api/products` |
| 2 | Product Detail | View detailed information of a single product | `/products/:id` | `GET /api/products/:id` |
| 3 | Category Filter | Filter products by category | `/products?category=:slug` | `GET /api/products?category=:slug` |
 
---


## 📁 Frontend Structure

```
src/
├── app/                        # App-level setup (router, providers, config)
├── assets/                     # Static assets (images, icons, fonts)
├── data/                       # Static/local data and constants
├── features/                   # Feature-based modules
│   ├── about/
│   ├── admin/
│   ├── auth/
│   ├── bot/
│   ├── cart/
│   ├── contact/
│   ├── faq/
│   ├── policy/
│   ├── products/
│   ├── profile/
│   ├── returns/
│   ├── shipping/
│   ├── theme/
│   └── tos/
├── mocks/                      # MSW handlers and mock data
├── pages/                      # Route-level page components
├── shared/                     # Reusable components, hooks, utils
├── stylesheets/                # Global styles and Tailwind config
├── App.jsx
└── main.jsx
```

## 📁 Backend Structure

```
backend/
├── app/                        # Core application logic (Models, Controllers, Services)
├── bootstrap/                  # App bootstrapping and service provider registration
├── config/                     # Configuration files (database, mail, auth, etc.)
├── database/                   # Migrations, seeders, and factories
├── public/                     # Publicly accessible entry point (index.php, assets)
├── resources/                  # Views and raw assets (if any)
├── routes/                     # API and web route definitions
├── storage/                    # Logs, cache, and uploaded file storage
├── tests/                      # Unit and feature tests
├── .env.example                # Environment variable template
├── artisan                     # Laravel CLI entry point
├── composer.json               # PHP dependency manifest
└── vite.config.js              # Vite config for asset bundling
```

## 📊 ERD - Database Design w/ Laravel Migrations
![Entity Relationship Diagram](/assets/images/db-preview.png)
---

## Installation

### Prerequisites

- Node.js 18+
- PHP 8.2+
- Composer
- MySQL

### Clone the repository

```bash
git clone https://github.com/Dekxisosta/zenless-collective.git
cd zenless-collective
```

### Frontend

```bash
cd frontend
npm install
npx msw init public/
npm run dev
```

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Update your `.env` with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=zenless_collective
DB_USERNAME=root
DB_PASSWORD=
```

Then run:

```bash
php artisan migrate
php artisan db:seed   # optional: seed with sample data
php artisan serve
```


## Related Links
[Figma Prototype](https://www.figma.com/make/65s1RP1XCMI240CX44rtsn/E-Commerce-Store-for-Tech?p=f&t=CN4F0wjTQKSKtIyH-0) | 
[Google Doc](https://docs.google.com/document/d/1mdx5yPjPTyAJ9lKZSOSAVE83FUZbyLBeJlMZHImdl1I/edit?tab=t.0)


