const Router = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth.middleware')

const SECRET_KEY = config.get("SECRET_KEY")
const router = new Router()

router.post('/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Uncorrect password: must be min 3 max 12').isLength({ min: 3, max: 12 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ msg: 'Uncorrect' })

      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) return res.status(400).json({ msg: `User ${email} already exist` })

      const hashPassword = await bcrypt.hash(password, 8)
      const user = await new User({ email, password: hashPassword })

      await user.save()

      res.json({ msg: 'User was created' })

    } catch (err) {
      console.log(err)
      res.send({ msg: 'Something wrong' })
    }
  })

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'User not exist' })

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) return res.status(400).json({ msg: 'Uncorrect password' })

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' })

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      }
    })

  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: 'Something wrong' })
  }
})

router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' })

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      }
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: 'Something wrong' })
  }
})

module.exports = router
