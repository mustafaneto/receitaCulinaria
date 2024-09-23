require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const usuarioRoutes = require('./routes/usuario');
const receitaRoutes = require('./routes/receita');
const categoriaRoutes = require('./routes/categoria');

app.use(express.json());
app.use(cors());

app.use(usuarioRoutes);
app.use(receitaRoutes);
app.use(categoriaRoutes);

app.listen(3000);