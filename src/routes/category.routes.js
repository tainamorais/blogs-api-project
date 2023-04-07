const { Router } = require('express');

const categoryController = require('../controllers/category.controller');
const { tokenValidator } = require('../middlewares/validator');

const router = Router();

router.get('/', tokenValidator, categoryController.getAll);

module.exports = router;
