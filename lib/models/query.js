const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
  input: {
    type: String,
    required: true,
    maxLength: 240
  },
  output: {
    type: String,
    required: true
  },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  // folder: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Folder'
  // }

});

module.exports = mongoose.model('Query', schema);