const { Router } = require('express');

const postController = require('../controllers/post.controller');
const { tokenValidator } = require('../middlewares/validator');

const router = Router();

router.get('/', tokenValidator, postController.getAll);
router.get('/:id', tokenValidator, postController.getById);

router.post('/', tokenValidator, postController.create);

/*
FIZ ANTES DA FUNÇÃO POST - CREATE.
NÃO PASSA NO 2º ITEM DE TESTE.
A RESPOSTA DE ERRO É QUE NÃO CONSEGUE REALIZAR POST.
ACREDITO QUE TENHA QUE FAZER FUNÇÃO POST ANTES.
NA MÁQUINA, TUDO FUNCIONA, TODOS OS MEUS TESTES FORAM BEM-SUCEDIDOS.
*/
router.delete('/:id', tokenValidator, postController.remove);

module.exports = router;
