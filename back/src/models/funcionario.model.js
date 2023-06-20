class Funcionario {
    constructor(i) {
        this.matricula = i.matricula; // Propriedade "matricula" do objeto Funcionario
        this.nome = i.nome; // Propriedade "nome" do objeto Funcionario
        this.admissao = i.admissao; // Propriedade "admissao" do objeto Funcionario
        this.salario = i.salario; // Propriedade "salario" do objeto Funcionario
        this.pagamento = i.pagamento; // Propriedade "pagamento" do objeto Funcionario
        this.desempenho = i.desempenho; // Propriedade "desempenho" do objeto Funcionario
        this.bonificacao = this.calcBonificacao(); // Propriedade "bonificacao" do objeto Funcionario calculada pelo método "calcBonificacao()"
    }

    // Métodos CRUD

    create() {
        // Retorna uma string com o comando SQL de inserção na tabela "funcionarios" com os dados do objeto Funcionario
        return `INSERT INTO funcionarios VALUE(default,'${this.nome}','${this.admissao}',${this.salario},CURDATE(),${this.desempenho},${this.bonificacao})`;
    }

    read() {
        if (this.matricula == undefined)
            // Retorna uma string com o comando SQL de seleção de todos os registros da tabela "funcionarios"
            return `SELECT * FROM funcionarios`;
        else
            // Retorna uma string com o comando SQL de seleção do registro com a matricula especificada da tabela "funcionarios"
            return `SELECT * FROM funcionarios WHERE matricula = ${this.matricula}`;
    }

    update() {
        // Retorna uma string com o comando SQL de atualização dos dados do registro com a matricula especificada na tabela "funcionarios"
        return `UPDATE funcionarios SET nome = '${this.nome}', admissao = '${this.admissao}', salario = ${this.salario}, pagamento = '${this.pagamento}', desempenho=${this.desempenho} WHERE matricula = ${this.matricula}`;
    }

    delete() {
        // Retorna uma string com o comando SQL de exclusão do registro com a matricula especificada na tabela "funcionarios"
        return `DELETE FROM funcionarios WHERE matricula = ${this.matricula}`;
    }

    // Métodos de cálculo

    calcAnos() {
        // Calcula a diferença em anos entre a data de admissao e a data atual
        let admissao = new Date(this.admissao);
        let hoje = new Date();
        let difTempo = Math.abs(admissao - hoje);
        let anos = Math.floor(difTempo / (1000 * 60 * 60 * 24 * 365));
        return anos;
    }

    calcBonificacao() {
        // Calcula a bonificação com base no salário, tempo de admissao e desempenho do funcionário
        return (this.salario * 2 / 100) * this.calcAnos() * this.desempenho;
    }
}

module.exports = Funcionario; // Exporta a classe Funcionario para uso em outros módulos
