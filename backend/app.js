const express = require('express');

const app = express();

const usuarioRoutes = require('./routes/usuario');
const receitaRoutes = require('./routes/receita');

app.use(express.json());
app.use('/api', usuarioRoutes);
app.use('/api', receitaRoutes);

app.listen(3000);