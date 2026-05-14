const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Playlist name is required.'],
        trim: true,
        maxlength: [100, 'Playlist name cannot exceed 100 characters.']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters.']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: [true, 'A playlist must have an owner.']
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song' // Array of references to the Song model
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Create and export the model
const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;