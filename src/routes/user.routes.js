const { Router } = require('express');

const userController = require('../controllers/user.controller');
const { tokenValidator } = require('../middlewares/validator');

const router = Router();

router.get('/', tokenValidator, userController.getAll);
router.get('/:id', tokenValidator, userController.getById);
router.post('/', userController.create);
router.delete('/me', tokenValidator, userController.remove);

module.exports = router;
