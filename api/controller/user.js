/**
 * Module to handle register & login of users
 */

const User = require('../model/user')
const AuthService = require('../service/auth')

const register = async (req, res) => {
  const {
    username,
    password,
    password2,
  } = req.body

  if (password === password2) {
    try {
      const user = await User.create({ username, password })
      const token = AuthService.issue({ id: user.id })

      return res.status(201).json({ token })
    } catch (err) {
      console.error(err)
      if (err.message.includes('duplicate')) {
        return res.status(409).json('User is already registered')
      }
      return res.status(500).json('Internal server error')
    }
  }

  return res.status(400).json('Passwords don\'t match')
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findByCredentials(username, password)

    if (!user) {
      return res.status(401).json('Invalid login credentials')
    }

    const token = AuthService.issue({ id: user.id })
    return res.status(200).json({ token })
  } catch (error) {
    return res.status(401).json(error.message)
  }
}

module.exports = {
  register,
  login,
}
