const router = require('express').Router();
const whatsMessageCtrl = require('../controllers/whatsMessageCtrl');

router.post('/messageSubmit', whatsMessageCtrl.messageSubmitPost);

module.exports = router;