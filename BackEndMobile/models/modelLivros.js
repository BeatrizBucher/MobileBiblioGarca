const executeQuery = require('../services/query');
const bcrypt = require('bcrypt');

const modelLivro = {

    //Registrar
    cadastrar: async (titulo, categoria, autor, editora, ano, quantidade, isbn) => {
        try {

            const result = await executeQuery(
                "INSERT INTO cadastrar_livros (titulo, categoria, autor, editora, ano, quantidade, isbn) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [titulo, categoria, autor, editora, ano, quantidade, isbn]
            );

            return result;

        } catch (error) {
            throw error;
        }
    },

    //Obter NIF
    consultarISBN: async (isbn) => {

        const result = await executeQuery("SELECT * FROM cadastrar_livros WHERE isbn = ?", [isbn]);
        return result;
    },

    //Listar 
    listar: async () => {

        try {

            const result = await executeQuery("SELECT id, titulo, categoria, autor, editora, ano, quantidade, isbn FROM cadastrar_livros");
            return result;
        }
        catch (error) {
            throw error;
        }

    },

    //Obter usuário por ID
    listarPorID: async (id) => {
        return await executeQuery('SELECT id FROM cadastrar_livros WHERE id=?', [id]);
    },

    //Atualizar
    atualizar: async (titulo, categoria, autor, editora, ano, quantidade, isbn, id ) => {
        try {
            const result = await executeQuery("UPDATE cadastrar_livros SET titulo=?, categoria=?, autor=?, editora=?, ano=?, quantidade=?, isbn=? WHERE id=?",
                [titulo, categoria, autor, editora, ano, quantidade, isbn, id])
            return result;
        } catch (error) {
            throw error;
        }
    },

    //Deletar
    deletar: async (id) => {
        const result = await executeQuery("DELETE FROM cadastrar_livros WHERE id=?", [id])
        return result;

    },



    //user
    cadastrarUser: async (nome, email, senha) => {
        try {

             const password = await bcrypt.hash(senha, 10);
            const result = await executeQuery(
                "INSERT INTO cadastrar_usuario (nome, email, senha) VALUES (?, ?, ?)",
                [nome, email, password]
            );

            return result;

        } catch (error) {
            throw error;
        }
    },

    //Obter NIF
    consultarEmail: async (email) => {

        const result = await executeQuery("SELECT * FROM cadastrar_usuario WHERE email = ?", [email]);
        console.log(result)
        return result;
    },

    //LOGIN
    login: async (email, senha) => {
        console.log("Chegou no model login");
        try {

            const consulta = await modelLivro.consultarEmail(email);
            console.log(consulta)
           


            if (consulta.length > 0) {
                const match = await bcrypt.compare(senha, consulta[0].senha);
                console.log(match)

                if (match) {
                    const success = true;
                    return success
                }
                return null
            }
            return null;
        } catch (error) {
            console.log("caiu no catch");
            throw error;
        }
    },

};

module.exports = modelLivro;