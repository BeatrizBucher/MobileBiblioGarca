const e = require('express');
const modelLivro = require('../models/modelLivros');

const controllerLivro = {

    //Controller para registrar 
    registrarLivro: async (req, res) => {
        const { titulo, categoria, autor, editora, ano, quantidade, isbn } = req.body;

        try {
            const isbnExistente = await modelLivro.consultarISBN(isbn);

            if (isbnExistente.length > 0) {
                return res.status(400).json({ msg: "ISBN já está cadastrado!" });
            }
            else {
                const resultado = await modelLivro.cadastrar(titulo, categoria, autor, editora, ano, quantidade, isbn);

                if (resultado.affectedRows > 0) {
                    res.status(201).json({ msg: "Livro cadastrado com sucesso" });
                }
                else {
                    res.status(400).json({ msg: "Falha ao realizar o cadastro" });
                }
            }
        }
        catch (erro) {
            console.error(erro);
            res.status(500).json({ error: 'Erro ao tentar cadastrar' });
        }
    },

    //Controller para listar
    listarSenai: async (req, res) => {
        try {
            const colaboradores = await modelLivro.listar();
            res.status(200).json(colaboradores);
        }
        catch (erro) {
            res.status(500).json({ error: "Erro ao obter a lista de colaboradores" });
        }
    },

    //Controller para atualizar
    atualizar: async (req, res) => {
        const { titulo, categoria, autor, editora, ano, quantidade, isbn  } = req.body;

        try {
            const consulta = await modelLivro.listarPorID(req.params.id);

            if (consulta.length > 0) {
                await modelLivro.atualizar(titulo, categoria, autor, editora, ano, quantidade, isbn, req.params.id);
                res.status(200).json({ msg: "Dados atualizados com sucesso!!!" });
            }
            else {
                res.status(404).json({ msg: `O ID ${req.params.id} não existe na base de dados` })
            }
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar atualizar' });
        }
    },

    //Controller para deletar
    deletar: async (req, res) => {
        try {

            const consulta = await modelLivro.listarPorID(req.params.id)

            if (consulta.length > 0) {

                const resultado = await modelLivro.deletar(req.params.id);

                if (resultado.affectedRows > 0) {
                    res.status(204).end()
                }
                else {
                    res.status(404).json({ msg: "Erro ao deletar o usuário" })
                }
            }
            else {
                res.status(404).json({ msg: "O ID não existe na base de dados" })
            }
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar deletar' });
        }
    },

     registrarUsuario: async (req, res) => {
        const { nome, email, senha} = req.body;

        try {
            const emailExistente = await modelLivro.consultarEmail(email);

            if (emailExistente.length > 0) {
                return res.status(400).json({ msg: "ISBN já está cadastrado!" });
            }
            else {
                const resultado = await modelLivro.cadastrarUser(nome, email, senha);

                if (resultado.affectedRows > 0) {
                    res.status(201).json({ msg: "Livro cadastrado com sucesso" });
                }
                else {
                    res.status(400).json({ msg: "Falha ao realizar o cadastro" });
                }
            }
        }
        catch (erro) {
            console.error(erro);
            res.status(500).json({ error: 'Erro ao tentar cadastrar' });
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;
        
        try {
            const result = await modelLivro.login(email, senha);
            console.log(result)

            if (!result) {
                res.status(401).json({ error: 'Email ou senha incorretos' });
            } else {
                res.status(200).json({ result: 'cadastrado com sucesso' });

            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro no servidor' });
            
        }
    },

};

module.exports = controllerLivro;


