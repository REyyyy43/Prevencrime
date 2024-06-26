const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  victimCount: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  weaponUsed: {
    type: String,
    required: true,
  },
  motorcycleUsed: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Define el método toJSON para personalizar la serialización a JSON
reportSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const report = mongoose.model('report', reportSchema);

module.exports = report;