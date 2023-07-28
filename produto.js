function cadastraProduto() {
    let nome = document.getElementById("nome").value
    let valor = document.getElementById("valor").value
    let descricao = document.getElementById("descricao").value
    let imagem = document.getElementById("imagem").value

    let produto = {
        nome,
        valor,
        descricao,
        imagem
    }

    if (!localStorage.getItem("produtos")) {
        localStorage.setItem("produtos", JSON.stringify([]))
    }

    let produtos = JSON.parse(localStorage.getItem("produtos"))

    produtos.unshift(produto)

    localStorage.setItem("produtos", JSON.stringify(produtos))

    limpaCampos()
    listaProdutos()
}

function listaProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos"))
    let html = ""

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        let card = `
        <div class="col-4">
        <div class="card mb-4" style="width: 18rem;">
            <img style="height: 180px; object-fit:contain; " src="${produto.imagem}" class="card-img-top" alt="Sem imagem">
            <div class="card-body">
              <h5 class="card-title">${produto.nome}</h5>
              <p>R$ ${produto.valor}</p>
              <p class="card-text">${produto.descricao}</p>
              <button type="button" class="btn btn-primary" onclick="atualizaProduto(${i})">Editar</button>
              <button type="button" class="btn btn-danger" onclick="deletaProduto(${i})">Excluir</button>
            </div>
          </div>
    </div>
    `
        html += card

    }

    document.getElementById("produtos").innerHTML = html
}

function deletaProduto(index) {
    let produtos = JSON.parse(localStorage.getItem("produtos"))
    produtos.splice(index, 1)
    localStorage.setItem("produtos", JSON.stringify(produtos))
    listaProdutos()
    limpaCampos()
    document.getElementById("action").innerText = "Cadastrar Produto Produto"
    document.getElementById("btn-cadastra").style.display = "block"
    document.getElementById("btn-atualiza").style.display = "none"
}

function atualizaProduto(index) {
    let produtos = JSON.parse(localStorage.getItem("produtos"))
    if (index >=0) {
        document.getElementById("action").innerText = "Atualizar Produto"
        document.getElementById("btn-cadastra").style.display = "none"
        document.getElementById("btn-atualiza").style.display = "block"

        document.getElementById("nome").value = produtos[index].nome
        document.getElementById("valor").value = produtos[index].valor
        document.getElementById("descricao").value = produtos[index].descricao
        document.getElementById("imagem").value = produtos[index].imagem

        window.produto_index = index
        return
    }

    let nome = document.getElementById("nome").value
    let valor = document.getElementById("valor").value
    let descricao = document.getElementById("descricao").value
    let imagem = document.getElementById("imagem").value

    let produto_editado = {
        nome,
        valor,
        descricao,
        imagem
    }

    produtos.splice(window.produto_index, 1, produto_editado)
    localStorage.setItem("produtos", JSON.stringify(produtos))
    listaProdutos()

    limpaCampos()

    document.getElementById("action").innerText = "Cadastrar Produto Produto"
    document.getElementById("btn-cadastra").style.display = "block"
    document.getElementById("btn-atualiza").style.display = "none"

    window.produto_index = -1
}

listaProdutos()

function limpaCampos() {
    document.getElementById("nome").value = ""
    document.getElementById("valor").value = ""
    document.getElementById("descricao").value = ""
    document.getElementById("imagem").value = ""
}
