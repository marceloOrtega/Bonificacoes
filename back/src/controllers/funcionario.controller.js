const con = require('../dao/connect'); // Importa o módulo 'connect' responsável pela conexão com o banco de dados
const Funcionario = require('../models/funcionario.model'); // Importa o modelo Funcionario do arquivo 'funcionario.model'

// Método que recebe uma lista e aplica o modelo em todos os elementos
const modelarLista = (lista) => {
    for (i = 0; i < lista.length; i++)
        lista[i] = new Funcionario(lista[i]); // Cria um novo objeto Funcionario para cada elemento da lista
    return lista;
}

// Métodos CRUD

// Função responsável por criar um novo funcionário
const criar = (req, res) => {
    let funcionario = new Funcionario(req.body); // Cria um novo objeto Funcionario com os dados recebidos no corpo da requisição
    con.query(funcionario.create(), (err, result) => {
        if (err == null)
            res.status(201).end(); // Retorna o status 201 (Created) indicando que o funcionário foi criado com sucesso
        else
            res.status(500).json(err).end(); // Retorna o status 500 (Internal Server Error) e uma mensagem de erro caso ocorra um erro na consulta ao banco de dados
    });
}

// Função responsável por listar os funcionários
const listar = (req, res) => {
    let funcionario = new Funcionario(req.params); // Cria um novo objeto Funcionario com os parâmetros recebidos na requisição
    con.query(funcionario.read(), (err, result) => {
        if (err == null){
            res.json(modelarLista(result)).end(); // Retorna os resultados da consulta após aplicar o modelo em cada elemento da lista
        }
    });
}

// Função responsável por alterar os dados de um funcionário
const alterar = (req, res) => {
    let funcionario = new Funcionario(req.body); // Cria um novo objeto Funcionario com os dados recebidos no corpo da requisição
    con.query(funcionario.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end(); // Retorna o status 202 (Accepted) indicando que a alteração foi realizada com sucesso
        else
            res.status(404).end(); // Retorna o status 404 (Not Found) caso o funcionário não seja encontrado
    });
}

// Função responsável por excluir um funcionário
const excluir = (req, res) => {
    let funcionario = new Funcionario(req.params); // Cria um novo objeto Funcionario com os parâmetros recebidos na requisição
    con.query(funcionario.delete(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(204).end(); // Retorna o status 204 (No Content) indicando que a exclusão foi realizada com sucesso
        else
            res.status(404).end(); // Retorna o status 404 (Not Found) caso o funcionário não seja encontrado
    });
}

// Função de teste para verificar se o sistema está respondendo
const teste = (req, res) => {
    res.json("Sistema de Bonificações Respondendo").end();
}

module.exports = {
    teste,
    criar,
    listar,
    alterar,
    excluir
};
