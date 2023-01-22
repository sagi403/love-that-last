# LTL eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

## Features

- Full featured shopping cart
- Product reviews and ratings
- Product search feature
- Product sort feature
- Add new product (include upload image)
- Product / User / Order pagination
- User profile with orders
- Admin user management
- Admin product management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products, users)
- Forgot password feature (send validation email)
- Frontend/backend validation
- Tests for backend routes (+130 tests)
- Auth guard for selected routes
- Limited request rate
- Full deployment with Docker 

## Usage

### ES Modules in Node

I use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

You can also install and setup Babel if you would like.

### Env Variables

Create a .env file in the backend directory and add the following:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abcde123567'
URL = http://localhost:3000
EMAIL_USER = your email address
EMAIL_PASSWORD = your email password
EMAIL = an email to send from
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
cd frontend
npm install
cd ../backend
npm install
```

### Run

Run frontend (:3000) & backend (:5000)

```
cd backend
npm run dev
```

Run backend only

```
cd backend
npm run server
```

Run tests

```
cd backend
npm run test
```

## Build & Deploy

Create frontend prod build

```
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data.

```
# Import data
cd backend
npm run data:import

# Destroy data
cd backend
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```
