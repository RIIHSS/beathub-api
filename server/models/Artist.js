const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Get the current year for the debutYear validation
const currentYear = new Date().getFullYear();

const artistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Artist name is required'],
        unique: true, // Ensuring no duplicate artist names
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        // Enum restricts the string to these specific values
        enum: {
            values: ['Pop', 'Rock', 'Hip-Hop', 'Jazz'],
            message: '{VALUE} is not a supported genre'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    debutYear: {
        type: Number,
        // Validation: Modern era only
        min: [1900, 'Debut year cannot be before 1900'],
        // Validation: No future years
        max: [currentYear, `Debut year cannot be greater than ${currentYear}`]
    },
    bio: {
        type: String,
        // Optional by default, but if provided, it must meet this length
        minlength: [10, 'Bio must be at least 10 characters long'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', artistSchema);