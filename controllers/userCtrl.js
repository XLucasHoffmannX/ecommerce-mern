// model
const Users = require('../models/userModel');
const Payments = require('../models/paymentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Parei na aula #3

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      // verify email
      if (user) return res.status(400).json({ msg: "Esse email já existe!" })

      // verify password<6
      if (password.length < 6) return res.status(400).json({ msg: "Senha muito pequena, deve ser maior que 6!" })

      // Password Encryption
      const passwordEncrypt = await bcrypt.hash(password, 10);

      // Save collection
      const newUser = new Users({
        name, email, password: passwordEncrypt
      })

      await newUser.save()

      // jwt - authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token'
      })

      res.json({ accesstoken })
      // res.json({ msg: "Usuário registrado com sucesso!" })
    } catch (error) { res.status(500).json({ msg: error.message }) }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Usuário não existente!" })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: "A senha se encontra incorreta!" })

      // login sucess
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token'
      })

      res.json({ accesstoken })

    } catch (err) { return res.status(500).json({ msg: err.message }) }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' })

      return res.json({ msg: "Você optou em sair!" })
    } catch (err) { return res.status(500).json({ msg: err.message }) }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Por favor realize o login ou o cadastro!" })

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Por favor realize o login ou o cadastro! - 304" })

        const accesstoken = createAccessToken({ id: user.id })

        res.json({ accesstoken })
      })

    } catch (err) { return res.status(500).json({ msg: err.message }) }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password')
      if (!user) return res.status(400).json({ msg: "Usuário não existente!" })
      res.json(user)
    } catch (err) { return res.status(500).json({ msg: err.message }) }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id)
      if (!user) return res.status(400).json({ msg: "Usuário não existe!" })

      await Users.findOneAndUpdate({ _id: req.user.id }, {
        cart: req.body.cart
      })

      return res.json({ msg: "Adicionado ao carrinho!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }, 
  history: async(req, res)=>{
    try {
      const history = await Payments.find({user_id: req.user.id});

      res.json(history)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

// tokens 
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACESS_TOKEN_SECRET, { expiresIn: '11m' })
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = userCtrl;