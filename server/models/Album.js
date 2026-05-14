const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Album title is required.'],
        trim: true
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist', // Links to the Artist model
        required: [true, 'An album must be linked to an artist.']
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song' // Links to the Song model (Array of IDs)
    }]
}, {
    timestamps: true // Automatically tracks createdAt and updatedAt
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;