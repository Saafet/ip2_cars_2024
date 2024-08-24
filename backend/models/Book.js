// models/Book.js

const mongoose = require('mongoose');

// Definicija sheme za knjigu
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    publishedDate: {
        type: Date,
    },
});

// Eksportovanje modela kako bi ga mogli koristiti u drugim dijelovima aplikacije
module.exports = mongoose.model('Book', BookSchema);
