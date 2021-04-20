const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

  if (req.method === 'OPTIONS') return next()

  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ msg: 'Auth error' })
    const decoded = jwt.verify(token, config.get('SECRET_KEY'))
    req.user = decoded
    next()

  } catch (err) {
    return res.status(401).json({ msg: 'Auth error' })
  }
}