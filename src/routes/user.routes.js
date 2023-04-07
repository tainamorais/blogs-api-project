const { Router } = require('express');

const userController = require('../controllers/user.controller');
const { tokenValidator } = require('../middlewares/validator');

const router = Router();

router.get('/', tokenValidator, userController.getAll);
router.post('/', userController.create);

module.exports = router;
