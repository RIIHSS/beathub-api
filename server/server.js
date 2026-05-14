require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api'); // Import the router

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware
app.use(express.json());

// 2. Database Connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error('ERROR: MONGODB_URI is not defined');
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ Connection error:', err.message));

// 3. Connection Monitoring
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// 4. Routes
// Basic Status Routes
app.get('/', (req, res) => res.json({ message: 'BeatHub API Online', db: mongoose.connection.readyState }));

// Use the API Router for all /api paths
app.use('/api', apiRoutes);

// 5. Graceful Shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

// 6. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});