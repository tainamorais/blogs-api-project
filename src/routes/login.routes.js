const { Router } = require('express');

const loginController = require('../controllers/login.controller');

const router = Router();

router.post('/', loginController);

module.exports = router;
