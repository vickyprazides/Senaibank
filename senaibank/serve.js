const express = require('express');
const app = express();

const contaRoutes = require('./src/routes/contaRoutes');

app.use(express.json());
app.use(contaRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});