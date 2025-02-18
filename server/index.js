const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const routes = require('./routes');
const cors = require('cors');
// Cron jobs for sending reminder push notifications
require('./config/cronJobs');

// Config dotenv
dotenv.config({ path: path.join(__dirname, '.env') });
const {initialize} = require("./config/passportConfig");

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api', routes);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(initialize());

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
