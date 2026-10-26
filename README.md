# ahm3t shop

A responsive demo storefront built with React, TypeScript, Vite, Redux Toolkit, and TanStack Query. Product data and demo authentication are provided by [DummyJSON](https://dummyjson.com/).

## Features

- Browse products by category, search, and load additional results as you scroll.
- View product images, availability, ratings, and review information when available.
- Save favorites and manage a persistent shopping cart.
- Sign in to access protected cart and favorites pages.
- Complete a demo checkout using cash on delivery and see an order confirmation.

> Checkout is for demonstration only. Orders are not sent to a backend, and no payment is processed.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Validation and production

```bash
npm run lint
npm run build
npm run preview
```

Redux Persist stores the cart, favorites, and demo auth state in browser storage. The product catalog is loaded from DummyJSON at runtime, so an internet connection is required for product data and sign-in.
