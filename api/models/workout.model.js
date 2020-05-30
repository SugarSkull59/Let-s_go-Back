const moongose = require('mongoose')

const workOutchema = new mongoose.Schema({

  owner: String, // _idUser
  name: String,
  exercices: [{
    type: moongose.Schema.Types.ObjectId,
    ref: 'Exercice'
  }],
  date: String
})

const workout = moongose.model('workout', workOutchema)

module.exports = workout
