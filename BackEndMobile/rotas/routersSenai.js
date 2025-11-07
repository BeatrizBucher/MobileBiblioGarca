const express = require('express');
const controllerLivro = require('../controllers/controllerLivros');

const routers = express.Router();

//Livro
routers.post('/cadastrar', controllerLivro.registrarLivro); 
routers.put('/atualizar/:id', controllerLivro.atualizar); 
routers.delete('/deletar/:id', controllerLivro.deletar); 
routers.get('/listarUsuario', controllerLivro.listarSenai); 

//Usuario
routers.post('/cadastrarUser', controllerLivro.registrarUsuario);
routers.post('/Login', controllerLivro.login);

module.exports = routers;