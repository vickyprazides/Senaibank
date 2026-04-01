const express = require('express');
const router = express.Router();

const controller = require('../controllers/contaController');

router.post('/contas', controller.criarConta);
router.get('/contas', controller.listarContas);

router.post('/deposito', controller.depositar);
router.post('/saque', controller.sacar);
router.post('/transferencia', controller.transferir);

router.get('/saldo/:id', controller.saldo);
router.get('/extrato/:id', controller.extrato);

module.exports = router;