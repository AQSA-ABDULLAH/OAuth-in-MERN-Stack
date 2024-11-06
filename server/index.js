const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// CORS setup for frontend URL
app.use(cors({
    origin: 'https://o-auth-in-mern-stack-evz4-rfschos6n-aqsa-abdullahs-projects.vercel.app',  // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // Allow credentials (cookies, headers)
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection (if necessary)
require('./db/connection');

// Routes
const userRoutes = require('./routes/users');
app.use('/api/user', userRoutes);

// Preflight request handling (for CORS)
app.options('*', cors());

// Define a simple route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
