# Buyer Shop (Angular)

Buyer-side mini app built with Angular 22: register, login, browse products, cart, checkout and order history.

## Prerequisites
- Node.js 20 or newer
- Angular CLI 22 (`npm install -g @angular/cli`)

## 1. Run the API (json-server)

Open a terminal in the `buyer-api` folder:

```bash
npm install
npm start
```

The API runs at http://localhost:3000

## 2. Run the app

Open a second terminal in the `buyer-app` folder:

```bash
npm install
ng serve
```

The app runs at http://localhost:4200

## Notes
- No `db.json` was provided, so I created my own (4 categories, 24 products) using `generate-db.js`. Running that script again resets all data.
- Styles are reused from my training project (SCSS barrel file + Tailwind CSS).
- The API is for training only. It is not a secure backend.

## Folder structure
```
src/app/
  core/       services, guards, interceptors, models
  shared/     components, directives, pipes, validators
  features/   auth, products, cart, orders
```

## Status

Done:
- [x] Task 1: Project setup and structure
- [x] Task 2: Registration and login
Not done:
- [ ] Task 3: Product listing (search, filter, sort)
- [ ] Task 4: Product details
- [ ] Task 5: Cart
- [ ] Task 6: Checkout and orders
- [ ] Task 7: Guards and interceptor
- [ ] Task 8: Error handling, loading, responsive design