const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// CORS setup for frontend URL
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://o-auth-in-mern-stack-frontend-78x.vercel.app',
            'https://your-other-frontend-url.com'
        ];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
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
