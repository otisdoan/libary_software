const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  },
  categoryName: {
    type: [String],
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  totalBook: {
    type: Number,
    required: true,
    min: 0
  },
  borrowBook: {
    type: Number,
    default: 0,
    min: 0
  },
  leftBook: {
    type: Number,
    min: 0
  },
  image: {
    type: String,
    required: false
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

bookSchema.pre('save', function(next) {
  this.leftBook = this.totalBook - this.borrowBook;
  next();
});
bookSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;