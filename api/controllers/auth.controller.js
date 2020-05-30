const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  handleError
} = require('../utils')


module.exports = {
  signup,
  login,
  checkRoles
}

function signup(req, res) {
  if (!req.body.password) {
    res.json({
      error: 'Password required'
    })
  }
  User
    .create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(() => {
      const token = jwt.sign({
        email: req.body.email
      },
        process.env.SECRET, // TAKE SECRET KEY FROM .ENV
        {
          expiresIn: '7d'
        }
      )
      return res.json({
        token: token,
        email: req.body.email,
        first_name: req.body.first_name
      })
    })
    .catch((err) => {
      res.status(403).json({
        error: err
      })
    })
}

function login(req, res) {
  User
    .findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        return res.json({
          error: 'wrong email'
        })
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          handleError(err)
        }
        if (!result) {
          return res.json({
            error: `wrong password for ${req.body.email}`
          })
        }

        const token = jwt.sign({
          email: user.email
        },
          process.env.SECRET, {
          expiresIn: '7d'
        }
        )

        return res.json({
          token: token,
          email: user.email,
          first_name: user.first_name,
          role: user.role
        })
      })
    })
    .catch(err => handleError(err, res))
}
function checkRoles(req, res, next) {
  User
    .find(res.locals.user._id)
  if (res.locals.user.role === "ADMIN") {
    return next()
  } else {
    res.redirect('/home')
  }
}