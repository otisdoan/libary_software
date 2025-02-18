const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  establishedYear: {
    type: Number,
  },
}, { timestamps: true });
publisherSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model('Publisher', publisherSchema);