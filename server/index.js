const express = require("express");
const cors = require("cors");
const ngrok = require("ngrok");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connection to MongoDB
require('./db/connection');

// Routes
const userRoutes = require('./routes/users');

// Load Routes
app.use('/api/user', userRoutes);

// Define a simple route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});