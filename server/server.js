// Load environment variables first
require('dotenv').config();

// Import packages
const express = require('express');
const mongoose = require('mongoose');

// --- IMPORT MODELS ---
const User = require('./models/user.model');
const Artist = require('./models/artist.model');
const Song = require('./models/song.model');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// --- MONGODB CONNECTION LOGIC ---

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('ERROR: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Connection monitoring
mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('Mongoose error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed');
  process.exit(0);
});

// --- ROUTES ---

// 1. Root Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'BeatHub API Server is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// 2. Status Endpoint
app.get('/status', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'Server is online',
    database: {
      state: states[mongoose.connection.readyState],
      name: mongoose.connection.name
    }
  });
});

// --- USER API ROUTES ---

// Create a new User
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ARTIST API ROUTES ---

// Create a new Artist
app.post('/api/artists', async (req, res) => {
  try {
    const newArtist = new Artist(req.body);
    await newArtist.save();
    res.status(201).json({ message: 'Artist signed to BeatHub!', artist: newArtist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Artists
app.get('/api/artists', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new Song
app.post('/api/songs', async (req, res) => {
  try {
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(201).json({ message: 'Song added to library!', song: newSong });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Songs
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});