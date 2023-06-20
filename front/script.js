const url = "http://localhost:3000"; // URL base para as requisições HTTP
const novo = document.querySelector("#novo"); // Referência ao elemento HTML com id "novo"
const corpo = document.querySelector("#corpo"); // Referência ao elemento HTML com id "corpo"
const total = document.querySelector("#total"); // Referência ao elemento HTML com id "total"
var dados = []; // Array para armazenar os dados obtidos da API

// Função para carregar os dados da API e preencher a tabela
function carregar() {
    fetch(url + '/listar', { method: 'GET' }) // Faz uma requisição GET para a URL + '/listar'
        .then(resp => resp.json()) // Converte a resposta em JSON
        .then(resp => {
            dados = resp; // Armazena os dados na variável "dados"
            preencherTabela(); // Chama a função para preencher a tabela com os dados obtidos
        })
        .catch(err => alert(err)); // Exibe um alerta em caso de erro
}

// Função para preencher a tabela com os dados obtidos
function preencherTabela() {
    let totalDinheiro = 0; // Variável para calcular o total de dinheiro
    dados.forEach((e) => {
        let linha = document.createElement("tr"); // Cria um elemento <tr> para a linha da tabela
        linha.setAttribute('id', 'linha' + e.matricula); // Define um atributo "id" para a linha
        let td = [];
        for (let i = 0; i < 9; i++) {
            td.push(document.createElement("td")); // Cria elementos <td> para as células da linha
            // Define o atributo "data-label" com o texto adequado para cada célula
            if (i < 7) td[i].setAttribute("data-label", Object.keys(e)[i].charAt(0).toUpperCase() + Object.keys(e)[i].substr(1) + ":");
            else if (i == 7) td[i].setAttribute("data-label", "Alterar:");
            else td[i].setAttribute("data-label", "Excluir:");
        }
        // Preenche as células com os dados do objeto "e"
        td[0].innerHTML = e.matricula;
        td[1].innerHTML = e.nome;
        td[1].setAttribute("contenteditable", "true"); // Permite a edição do conteúdo da célula
        td[2].innerHTML = `<input type="date" value="${e.admissao.split("T")[0]}">`;
        td[3].innerHTML = e.salario;
        td[3].setAttribute("contenteditable", "true"); // Permite a edição do conteúdo da célula
        td[4].innerHTML = `<input type="date" value="${e.pagamento.split("T")[0]}">`;
        td[5].innerHTML = e.desempenho;
        td[5].setAttribute("contenteditable", "true"); // Permite a edição do conteúdo da célula
        td[6].innerHTML = e.bonificacao.toFixed(2);
        // Cria botões para alterar e excluir os dados
        let btUpdate = document.createElement('button');
        btUpdate.innerHTML = '✅';
        btUpdate.setAttribute('onclick', `alterar(${e.matricula})`); // Define a função a ser chamada ao clicar no

        td[7].appendChild(btUpdate)
        let btDel = document.createElement('button')
        btDel.innerHTML = '❌'
        btDel.setAttribute('onclick', `excluir(${e.matricula})`)
        td[8].appendChild(btDel)
        for (let i = 0; i < 9; i++)
            linha.appendChild(td[i])
        corpo.appendChild(linha)
        totalDinheiro += e.bonificacao
    })
    total.innerHTML += ' ' + dados.length + ' Montante R$ ' + totalDinheiro.toFixed(2)
}

novo.addEventListener('submit', e => {
    e.preventDefault()
    const body = {
        "nome": novo.nome.value,
        "admissao": novo.admissao.value,
        "salario": novo.salario.value,
        "desempenho": novo.desempenho.value,
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    options.body = JSON.stringify(body)

    fetch(url + '/criar', options)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 201) window.location.reload()
            else alert('Erro ao enviar dados')
        })
})

function excluir(matricula) {
    fetch(url + '/excluir/' + matricula, { method: 'DELETE' })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 204)
                window.location.reload()
            else
                alert('Pagamento não encontrado')
        })
}

function alterar(matricula) {
    let linha = document.querySelector(`#linha${matricula}`)
    if (!isNaN(linha.childNodes[3].innerHTML) && !isNaN(linha.childNodes[5].innerHTML)) {
        const body = {
            "matricula": matricula,
            "nome": linha.childNodes[1].innerHTML,
            "admissao": linha.childNodes[2].childNodes[0].value,
            "salario": Number(linha.childNodes[3].innerHTML),
            "pagamento": linha.childNodes[4].childNodes[0].value,
            "desempenho": Number(linha.childNodes[5].innerHTML),
        }
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        options.body = JSON.stringify(body)

        fetch(url + '/alterar', options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 202) window.location.reload()
                else alert('Erro ao alterar dados')
            })
    } else {
        alert("Salário e desempenho devem ser dados numéricos")
    }
}

function filtro() {
    const texto = document.querySelector("#filtro");
    let filtro = texto.value.toUpperCase();
    var linhas = corpo.getElementsByTagName("tr");
    for (let i = 0; i < linhas.length; i++) {
        var id = linhas[i].getAttribute("id");
        if (id) {
            if (id.toUpperCase().includes(filtro)) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }
}


