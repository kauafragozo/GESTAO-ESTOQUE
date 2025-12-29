const nomeInput = document.getElementById("nomeproduto");
const quantidadeInput = document.getElementById("qtdproduto");
const btnAdicionar = document.getElementById("addbtn");
const listaProdutos = document.getElementById("listarprodutos");

let produtos = [];
let indexEditando = null;

btnAdicionar.addEventListener("click", () => {

    const nome = nomeInput.value;
    const quantidade = quantidadeInput.value;

    if (nome === "" || quantidade === "") {
        alert("Por favor, prencha todos os campos!");
        return;

    }

    if (indexEditando === null) {
        produtos.push({ nome, quantidade })
        atualizarTabela();
        limparTabela();
    } else {
        produtos[indexEditando] = { nome, quantidade };
        indexEditando = null;
        btnAdicionar.textContent = "Adicionar";
        atualizarTabela();
        limparTabela();

    }



});

function atualizarTabela() {
    listaProdutos.innerHTML = "";
    produtos.forEach((produto, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `

        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>
         <button onclick="removerProduto(${index})">Remover</button>
        </td>
        <td>
         <button onclick="editarProduto(${index})">Editar</button>
        </td>
        `;

        listaProdutos.appendChild(tr);
    })
}

function editarProduto(index) {
    const produto = produtos[index];
    nomeInput.value = produto.nome;
    quantidadeInput.value = produto.quantidade;
    indexEditando = index;
    btnAdicionar.textContent = "Salvar";
}

function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarTabela();
}

function limparTabela(){
    nomeInput.value = "";
    quantidadeInput.value = "";
}
