const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const frontend_url = process.env.FRONTEND_URL || 'https://o-auth-in-mern-stack-frontend-78x.vercel.app'; 
const app = express();

app.use(cors({
    origin: frontend_url,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database connection
require('./db/connection');

// Routes
const userRoutes = require('./routes/users');
app.use('/api/user', userRoutes);

// Define a simple route
app.get("/", (req, res) => {
    res.send("Welcome to drak!");
});

// Vercel serverless function export
module.exports = app;


