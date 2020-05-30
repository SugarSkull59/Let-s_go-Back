const mongoose = require('mongoose')

const exerciseschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  muscle_involved: {
    type: String,
    required: [true, 'Is required']
  },
  img: {
    type: String,
    required: true
  },
  /*   src: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'video_exercise',
      required: true
    }, */
  createdAt: {
    type: Number,
    default: Date.now()
  }
})

const exerciseModel = mongoose.model('exercise', exerciseschema)
module.exports = exerciseModel