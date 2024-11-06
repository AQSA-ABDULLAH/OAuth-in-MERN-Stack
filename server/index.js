const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// CORS setup for frontend URL
app.use((req, res, next) => {
    const allowedOrigins = [
        'https://o-auth-in-mern-stack-frontend-78x.vercel.app',
        'https://your-other-frontend-url.com'
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Explicitly handle OPTIONS requests
app.options('/api/user/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

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

