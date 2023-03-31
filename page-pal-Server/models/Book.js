const { Schema, model, Types: {ObjectId} } = require('mongoose');

const bookSchema = new Schema({
    bookName: {
        type: String,
        minLength: [3, 'The name of the book must be at least 3 charachters long']
    },
    author: {
        type: String,
        minLength: [3, 'The author\'s name must be at least 3 charachters long']
    },
    imgCover: {
        type: String,
        required: [true, 'Cover image is required']
    },
    year: {
        type: Number,
        validate: {
            validator: value => value >= 1732 && value < 2024,
            message: 'Year must be between 1732 and 2023'
        }
    },
    resume: {
        type: String,
        minLength: [10, 'The resume lenght must be at least 10 charachters long']
    },
    price: {
        type: Number,
        min: [0.1, 'Price must be a positive number']
    },
    _ownerId:{
        type: ObjectId,
        ref:'User',
        required: true
    },
    usersFavorites: {
        type: [ObjectId],
        default: []
    },
    comments: {
        type: [{
            user: { type: ObjectId, ref: 'User' },
            comment: String
        }],
        default: []
    },
    rating: {
        type: [{
            user: { type: ObjectId, ref: 'User' },
            stars: Number
        }],
        default: []
    },
});

const Book = model('Item', bookSchema);
module.exports = Book;