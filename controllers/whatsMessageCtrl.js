const venomCreate = require('../config/venomCreate');

const whatsMessageCtrl = {
  messageSubmitPost: async (req, res)=>{
    const {number, message} = req.body;
  let verify = false;
  let numberFormat = `55${number}@c.us`

  if(number && message) {
    (await venomCreate(numberFormat, message));
    verify = true
  }else{
    return res.status(404).json({msg: "Não foi possivel enviar, falta de parâmetros"})
  }

  return verify ? res.json({msg: "Sucesso!"}) : res.json({msg: "Erro encontrado!"})
  }
}

module.exports = whatsMessageCtrl;