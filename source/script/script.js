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
        salvarLocalStorage();
    } else {
        produtos[indexEditando] = { nome, quantidade };
        indexEditando = null;
        btnAdicionar.textContent = "Adicionar";
        atualizarTabela();
        limparTabela();
        salvarLocalStorage();

    }



});

function atualizarTabela() {
    listaProdutos.innerHTML = "";

    if(produtos.length === 0){
            listaProdutos.innerHTML = "<tr><td colspan = '4'>Nenhum produto cadastrado</td></tr>";
            return;

        }
        
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

    btnAdicionar.classList.add("editando");

}

function removerProduto(index) {
    const confirmar = confirm("Você tem certeza que deseja remover o item?");
    if (confirmar) {
        produtos.splice(index, 1);
        salvarLocalStorage();
        atualizarTabela();

    }
}

function limparTabela() {
    nomeInput.value = "";
    quantidadeInput.value = "";
}

function salvarLocalStorage(){
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function carregarLocalStorage(){
    const dados = localStorage.getItem("produtos");

        if(dados){
            produtos = JSON.parse(dados);
            atualizarTabela();
        }
    
}


atualizarTabela();
carregarLocalStorage();