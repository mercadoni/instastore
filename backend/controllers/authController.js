const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/generalConfig')

const SALT_ROUNDS = 10

module.exports = {

  /**
   * login the user 
   */
  login: async (req, res, next) => {
    let user = await User.findOne({username: req.body.username})
    if (!user) {
      return res.status(400).json({message: 'Username doesn\'t exist'})
    }
    const checkPassword = await bcrypt.compare(req.body.password, user.password)
    if (!checkPassword) {
      return res.status(400).json({message: 'Password doesn\'t match'})
    }

    // create jwt token
    const token = jwt.sign({ _id: user._id, username: user.username }, config.SECRET_WORD)
    
    return res.header('jwt-token', token).status(200).send(token)
  },


  /**
   * This is going to be used for populate users and aint to be an endpoint
   */
  signUpUser: async (userData) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(userData.password, salt)

    userData.password = hash
    const user = new User(userData)
    try  {
      const newUser = await user.save()
      return newUser
    } catch (error) {
      return error
    }
  }
}  