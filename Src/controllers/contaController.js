const { v4: uuidv4 } = require('uuid');
const { contas } = require('../data/db');

// Criar conta
function criarConta(req, res) {
    const { nome, cpf } = req.body;

    if (!nome || !cpf) {
        return res.status(400).json({ erro: "Nome e CPF são obrigatórios" });
    }

    const novaConta = {
        id: uuidv4(),
        nome,
        cpf,
        saldo: 0,
        extrato: []
    };

    contas.push(novaConta);

    res.status(201).json(novaConta);
}

// Listar contas
function listarContas(req, res) {
    res.json(contas);
}

// Depositar
function depositar(req, res) {
    const { id, valor } = req.body;

    const conta = contas.find(c => c.id === id);

    if (!conta) return res.status(404).json({ erro: "Conta não encontrada" });

    conta.saldo += valor;
    conta.extrato.push({ tipo: "deposito", valor });

    res.json(conta);
}

// Sacar
function sacar(req, res) {
    const { id, valor } = req.body;

    const conta = contas.find(c => c.id === id);

    if (!conta) return res.status(404).json({ erro: "Conta não encontrada" });

    if (conta.saldo < valor) {
        return res.status(400).json({ erro: "Saldo insuficiente" });
    }

    conta.saldo -= valor;
    conta.extrato.push({ tipo: "saque", valor });

    res.json(conta);
}

// Transferir
function transferir(req, res) {
    const { origemId, destinoId, valor } = req.body;

    const origem = contas.find(c => c.id === origemId);
    const destino = contas.find(c => c.id === destinoId);

    if (!origem || !destino) {
        return res.status(404).json({ erro: "Conta não encontrada" });
    }

    if (origem.saldo < valor) {
        return res.status(400).json({ erro: "Saldo insuficiente" });
    }

    origem.saldo -= valor;
    destino.saldo += valor;

    origem.extrato.push({ tipo: "transferencia_saida", valor });
    destino.extrato.push({ tipo: "transferencia_entrada", valor });

    res.json({ origem, destino });
}

// Saldo
function saldo(req, res) {
    const { id } = req.params;

    const conta = contas.find(c => c.id === id);

    if (!conta) return res.status(404).json({ erro: "Conta não encontrada" });

    res.json({ saldo: conta.saldo });
}

// Extrato
function extrato(req, res) {
    const { id } = req.params;

    const conta = contas.find(c => c.id === id);

    if (!conta) return res.status(404).json({ erro: "Conta não encontrada" });

    res.json(conta.extrato);
}

module.exports = {
    criarConta,
    listarContas,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
};