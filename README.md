# Foodie Quest

**Foodie Quest** is a modern and scalable food delivery platform built with the **MERN stack** and **TypeScript**. The app enables users to discover local restaurants, place food orders, and track deliveries in real time. It features secure authentication through **Auth0**, seamless payment processing via **Razorpay**, and fast, optimized media delivery using **Cloudinary**, ensuring a smooth and enjoyable experience for both customers and restaurant owners.

The user interface is designed with **Tailwind CSS** for a responsive layout, and the app employs **React Query** to efficiently manage data fetching and real-time updates. Whether you’re exploring restaurants, managing orders, or running a restaurant, Foodie Quest provides a fully-featured, secure, and intuitive platform.

## Key Features

- **Secure Authentication**: User login and registration powered by **Auth0**.
- **Advanced Search and Filtering**: Filter and paginate restaurant listings to enhance user experience.
- **Payment Integration**: Seamless, secure payment processing using **Razorpay**.
- **Restaurant Management**: Allows restaurant owners to create, update, and manage their listings.
- **Optimized Image Delivery**: **Cloudinary** integration for efficient image management and performance.
- **Schema Validation**: API validation using **Zod** to ensure data integrity.
- **Responsive UI**: Fully responsive design using **Tailwind CSS**, ensuring a consistent experience across devices.
- **API Security**: Secured API endpoints using **Express Validator**.

## Tech Stack

### Frontend
- **React** (with **TypeScript**)
- **React Query** (for data fetching and caching)
- **React Hook Form** (for form handling)
- **Tailwind CSS** (for UI styling)
- **Auth0** (for user authentication)
- **Razorpay** (for payment processing)
- **Cloudinary** (for media handling)
- **Zod** (for schema validation)

### Backend
- **Node.js** with **Express.js**
- **MongoDB** and **Mongoose** (for database management)
- **Razorpay** (payment integration)
- **Multer** (for file uploads)
- **JWT** (for secure authentication)
- **Express Validator** (for API security)
- **TypeScript**

## Installation

### Clone the Repository

```bash
git clone https://github.com/Muskan4556/foodie-quest.git
cd foodie-quest
```

### Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` directory and add the following environment variables:

```bash
REACT_APP_API_URL=http://localhost:3000
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:5173/
REACT_APP_AUTH0_AUDIENCE=your_auth0_audience
RAZORPAY_API_KEY=your_razorpay_key
```

4. Start the frontend development server:

```bash
npm run dev
```

### Backend Setup

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the `backend` directory and add the following environment variables:

```bash
MONGODB_URI=your_mongodb_uri
RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret
AUTH0_ISSUER_BASE_URL=your_auth0_secret
AUTH0_AUDIENCE=your_auth0_audience
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:

```bash
npm run dev
```


### Accessing the Deployed App

- **Frontend URL**: The frontend of the app is live and can be accessed at: [https://foodiequest-1.onrender.com](https://foodiequest-1.onrender.com)
- **Backend URL**: The backend API is available at: [https://foodiequest.onrender.com/health](https://foodiequest.onrender.com/health)

## Usage

- Open the frontend application in your browser at [http://localhost:5173](http://localhost:5173) for local development.
- The backend API will be available at [http://localhost:3000](http://localhost:3000) for local development.

