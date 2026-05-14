// 1. Import Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 2. Define the Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }
}, {
    // 3. Schema options
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// 4. Create the Model
// The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercase version: 'users'
const User = mongoose.model('User', userSchema);

// 5. Export the Model so we can use it in our routes
module.exports = User;