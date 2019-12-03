const jwt = require('jsonwebtoken')
const models = require('../models')

const tokenauth = async (req, res, next) => {
  const token = req.header('authToken').replace('Bearer ', '')
  const data = jwt.verify(token, process.env.JWT_KEY)
  try {
    const cat = await models.cat.findOne({ where: {id: data._id, 'authToken': token } })
    if (!cat) {
      throw new Error()
    }
    req.cat = cat
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}
module.exports = tokenauth
