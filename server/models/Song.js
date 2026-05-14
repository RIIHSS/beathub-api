const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Schema
const songSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Song title is required.']
    },
    artist: {
        type: String,
        required: [true, 'Artist name is missing.'],
        minlength: [3, 'Artist name must be at least 3 characters.']
    },
    genre: {
        type: String,
        enum: {
            values: ['Pop', 'Rock', 'Jazz', 'Hip-Hop'],
            message: '{VALUE} is not a valid genre.'
        },
        default: 'Pop'
    },
    duration: {
        type: Number, // represents seconds
        required: [true, 'Duration is required.'],
        min: [0, 'Duration cannot be negative.']
    }
}, {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
});

// Create and export the model
const Song = mongoose.model('Song', songSchema);
module.exports = Song;