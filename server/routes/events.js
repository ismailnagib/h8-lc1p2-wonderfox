const router = require('express').Router()
const { create, showAll, search } = require('../controllers/eventController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, create);
router.get('/', showAll);
router.get('/search/:keyword', isLogin, search)

module.exports = router;