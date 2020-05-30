const User = require('../models/user.model')
const bcrypt = require('bcrypt')


const {
  handleError
} = require('../utils')

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  changePassword
}

function getAllUsers(req, res) {
  if (res.locals.user.role === "ADMIN") {
    User
      .find()
      .then(response => res.json(response))
      .catch((err) => handleError(err, res))
  }
}

function getUserById(req, res) {
  User
    .findById(res.locals.user._id)
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function deleteUserById(req, res) {
  User
    .remove({
      _id: res.locals.user._id
    })
    .then(response => res.json(response))
    .catch(err => handleError(err, res))
}

function updateUser(req, res) {
  User
    .findByIdAndUpdate(res.locals.user._id, req.body, {
      new: true,
    })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}
function changePassword(req, res) {
  User
    .findById(res.locals.user._id)
    .then(user => {
      bcrypt.compare(req.body.actualPassword, user.password, (err, result) => {
        if (err) {
          return handleError(err)
        }
        if (!result) {
          return res.json({
            error: `Wrong password for ${user.first_name}`
          })
        }
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
        user.password = newPassword
        user.save()
          .then(response => res.json(response))
          .catch((err) => handleError(err, res))

      })
    })
}