require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const cors = require('cors'); // Import cors
const invoiceRoutes = require('./routes/invoices');
const authRoutes = require('./routes/auth');

const app = express();

// Enable CORS for all routes with specific options
app.use(cors());

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
