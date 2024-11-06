const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 3000;
const frontend_url = process.env.FRONTEND_URL
const app = express();

// CORS setup for frontend URL
app.use(cors({
    origin: "https://o-auth-in-mern-stack-frontend-78x.vercel.app/login",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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

