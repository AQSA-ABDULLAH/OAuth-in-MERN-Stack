const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// CORS setup for frontend URL
app.use(cors({
    origin: '*', // Allow all origins or specify the frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection (if necessary)
require('./db/connection');

// Routes
const userRoutes = require('./routes/users');
app.use('/api/user', userRoutes);

// Define a simple route
app.get("/", (req, res) => {
    res.send("Welcome to drak!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

