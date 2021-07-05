const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
  try {
    const token = req.header("Authorization")
    if(!token) return res.status(400).json({ msg: "Autenticação inválida!" })

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user)=>{
      if(err) return res.status(400).json({ msg: "Token expirado!" })

      req.user = user
      next();
    })
  } catch (err) {return res.status(500).json({ msg: err.message })}
}

module.exports = auth;