const bcrypt = require('bcrypt')
const seeder = require('mongoose-seed')

require('dotenv').config()

const UsersModel = require('./api/models/user.model')
const ExerciseModel = require('./api/models/exercise.model')


const EXERCISES = require('./exercises.json')


const ADMIN = {
  "first_name": "Begoña",
  "last_name": "Herrero",
  "email": "bego@321go.com",
  "password": bcrypt.hashSync('11111111', 10),
  "role": "ADMIN"
}


const USER = [
  {
    "first_name": "Adrian",
    "last_name": "Velázquez",
    "email": "adri@gmail.com",
    "password": bcrypt.hashSync('11111111', 10),
    "role": "USER"
  },
  {
    "first_name": "Néstor",
    "last_name": "Velázquez",
    "email": "nestor@gmail.com",
    "password": bcrypt.hashSync('11111111', 10),
    "role": "USER"
  }
]


seeder.connect(process.env.MONGO_URL + process.env.MONGO_DB, function () {
  seeder.loadModels(['./api/models/user.model.js', './api/models/exercise.model.js'])

  seeder.clearModels(['exercise', 'user'], async function () {

    const admin = UsersModel.create(ADMIN)
    const user = UsersModel.create(USER)

    for (i = 0; i < EXERCISES[0].documents.length; i++) {
      const exercise = EXERCISES[0].documents[i]
      await ExerciseModel.create(exercise)
    }

    seeder.disconnect()
  })
})
