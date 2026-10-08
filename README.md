<div align="center">

<img src="public/bazar-hero.png" alt="BazarDor" width="220" />

# BazarDor

### Bangladesh Daily Market Price Tracker

Track the latest prices of essential everyday products across different markets in Bangladesh — all in one place.

Rice, lentils, oil, vegetables, fish, meat, eggs, milk, spices, and more, with market-wise pricing, price changes, and product details.

<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-BazarDor-058a41?style=for-the-badge)](https://bazar-dor-sooty.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/shuvo524/bazar-dor)

</div>

---

## 📌 Overview

**BazarDor** is a full-stack market price tracking web application built for Bangladesh.

It provides current prices for **33 products across 8 categories**, including daily price changes, market-wise price comparisons, and minimum, maximum, and average prices.

The interface is designed for Bangla-speaking users, with localized numbers, dates, and units.

Product details and user profiles are protected using **BetterAuth** authentication.

---

## ✨ Features

* **Daily Price Tracking** — View current prices and daily price changes.
* **Price Change Highlights** — Quickly identify products with the biggest price increases and decreases.
* **Live Price Ticker** — Continuously scrolling market-price ticker with hover-to-pause behavior.
* **Category Browsing** — Explore products by category.
* **Price Sorting** — Sort products from lowest to highest or highest to lowest price.
* **Market Comparison** — Compare minimum, maximum, and average prices across different markets.
* **Authentication** — Email/password, Google, and GitHub authentication.
* **Protected Routes** — Product details and profile pages require authentication.
* **Profile Management** — View account information and update the user's name.
* **Loading Skeletons** — Smooth loading states for data-heavy pages.
* **Error & Empty States** — Friendly handling of invalid routes and empty categories.
* **Responsive Design** — Optimized for mobile, tablet, and desktop.
* **Toast Notifications** — Clear feedback for authentication and profile actions.

---

## 🖼️ Project Preview

The project includes a custom hero visual and a responsive interface designed for desktop, tablet, and mobile users.

---

## 🛠️ Tech Stack

| Category         | Technology                   |
| ---------------- | ---------------------------- |
| Framework        | Next.js (App Router)         |
| UI               | React                        |
| Language         | TypeScript                   |
| Styling          | Tailwind CSS, HeroUI         |
| Icons            | Gravity UI Icons             |
| Authentication   | BetterAuth                   |
| Database         | MongoDB Atlas                |
| Database Adapter | `@better-auth/mongo-adapter` |
| Notifications    | `react-hot-toast`            |
| Font             | Hind Siliguri                |
| Deployment       | Vercel                       |

---

## 📦 Dependencies

Main dependencies used in this project include:

* `next`
* `react`
* `react-dom`
* `better-auth`
* `@better-auth/mongo-adapter`
* `@heroui/react`
* `@gravity-ui/icons`
* `react-hot-toast`
* `typescript`

The project also uses Tailwind CSS and the standard Next.js development tooling.

---

## 🗺️ Application Routes

| Route              | Description                       | Auth |
| ------------------ | --------------------------------- | :--: |
| `/`                | Homepage                          |   ❌  |
| `/category/[slug]` | Category products and sorting     |   ❌  |
| `/product/[slug]`  | Product details and market prices |   ✅  |
| `/signin`          | Sign in                           |   ❌  |
| `/signup`          | Sign up                           |   ❌  |
| `/profile`         | User profile                      |   ✅  |
| `/profile/update`  | Update profile information        |   ✅  |
| `/api/auth/*`      | BetterAuth API                    |   —  |

---

## 🔌 API

BazarDor consumes product and market data from an external public API.

### Primary API

```text
https://api.api-store.workers.dev/api/bazardor
```

### Fallback API

```text
https://api.abcz.workers.dev/api/bazardor
```

The application automatically uses the fallback API if the primary API is unavailable.

### Endpoints

| Endpoint                      | Description              |
| ----------------------------- | ------------------------ |
| `GET /categories`             | Get all categories       |
| `GET /categories/:slug`       | Get a specific category  |
| `GET /products`               | Get all products         |
| `GET /products?category=chal` | Get products by category |
| `GET /products/:id`           | Get a specific product   |

---

## 🚀 Getting Started

### Prerequisites

Before running the project locally, make sure you have:

* Node.js 20+
* MongoDB Atlas cluster
* Google OAuth application
* GitHub OAuth application

### 1. Clone the Repository

```bash
git clone https://github.com/shuvo524/bazar-dor.git
cd bazar-dor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the required environment variables.

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> Never commit your `.env` file or expose authentication secrets.

### 4. Start the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🔐 OAuth Callback URLs

For local development:

### Google

```text
http://localhost:3000/api/auth/callback/google
```

### GitHub

```text
http://localhost:3000/api/auth/callback/github
```

For production, replace `localhost:3000` with your deployed domain.

---

## 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |

---

## 🔑 Authentication

Authentication is powered by **BetterAuth** with MongoDB Atlas.

Supported authentication methods:

* Email & Password
* Google OAuth
* GitHub OAuth

Protected routes redirect unauthenticated users to the sign-in page and return them to their intended destination after successful authentication.

---

## 📁 Project Structure

```text
bazar-dor/
├── public/
│   └── bazar-hero.png
│
└── src/
    ├── app/
    │   ├── category/[slug]/
    │   ├── product/[slug]/
    │   ├── profile/
    │   ├── signin/
    │   ├── signup/
    │   ├── api/auth/[...all]/
    │   └── not-found.tsx
    │
    ├── components/
    │   ├── Navbar
    │   ├── PriceTicker
    │   ├── ProductCard
    │   ├── Hero
    │   └── Authentication components
    │
    └── lib/
        ├── auth.ts
        ├── auth-client.ts
        ├── session.ts
        ├── api.ts
        ├── bangla.ts
        └── types.ts
```

---

## 🌐 Deployment

BazarDor is deployed on **Vercel**.

To deploy your own instance:

1. Import the GitHub repository into Vercel.
2. Add all required environment variables.
3. Set `BETTER_AUTH_URL` to your production URL.
4. Configure MongoDB Atlas network access.
5. Add the production OAuth callback URLs to your Google and GitHub OAuth applications.
6. Deploy the project.

Example:

```text
https://your-domain.com/api/auth/callback/google
https://your-domain.com/api/auth/callback/github
```

---

## 🔗 Relevant Links

* **Live Demo:** https://bazar-dor-sooty.vercel.app/
* **GitHub Repository:** https://github.com/shuvo524/bazar-dor
* **Developer Portfolio:** https://shuvo-das.bro.bd/
* **GitHub Profile:** https://github.com/shuvo524

---

## 👨‍💻 Developer

**Shuvo Das**

[GitHub](https://github.com/shuvo524) · [Live Project](https://bazar-dor-sooty.vercel.app/)

---

<div align="center">

### BazarDor — Know the Price Before You Shop.

<sub>Market prices are indicative and may vary depending on location and market conditions.</sub>

</div>
