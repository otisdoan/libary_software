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

// Middleware before create book
bookSchema.pre('save', function(next) {
  if (this.isModified('totalBook')) {
    if (this.totalBook < this.borrowBook) {
      return next(new Error('Total books cannot be less than borrowed books'));
    }
    this.leftBook = this.totalBook - this.borrowBook;
  }
  next();
});

// Middleware before update book
bookSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();

  if (update.totalBook !== undefined) {
    const book = await this.model.findOne(this.getQuery());

    if (!book) {
      return next(new Error('Book not found'));
    }

    if (update.totalBook < book.totalBook) {
      return next(new Error('Total books cannot be decreased'));
    }

    update.leftBook = update.totalBook - book.borrowBook;
  }

  next();
});

// Format the returned object
bookSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
