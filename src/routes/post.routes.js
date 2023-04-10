const { Router } = require('express');

const postController = require('../controllers/post.controller');
const { tokenValidator } = require('../middlewares/validator');

const router = Router();

router.get('/', tokenValidator, postController.getAll);
router.get('/:id', tokenValidator, postController.getById);

module.exports = router;
