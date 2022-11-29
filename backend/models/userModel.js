const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean, 
      required: true,
      default: false, //required sa defaultom prolazi bez da unesemo taj parametar
    },
  },
  {
    timestamps: true, // automatski dodava timestamp
  }
);

module.exports = mongoose.model('User', userSchema);
