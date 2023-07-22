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
        localStorage.setItem("produtos", "[]")
    }

    let produtos = JSON.parse(localStorage.getItem("produtos"))

    produtos.push(produto)

    localStorage.setItem("produtos", JSON.stringify(produtos))
    limpaCampos()
}

function listaProdutos() {
    let produtos = JSON.parse(localStorage.getItem("produtos"))
    let html = ""
    if (produtos) {
        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i]
            let card_produto = `
        <div class="col-4">
                <div class="card mb-5 shadow" style="width: 18rem;">
                    <img style="height: 140px; object-fit:cover;"  src="${produto.imagem}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">R$ ${produto.valor}</p>
                        <p class="card-text">${produto.descricao}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
        `;

            html = html + card_produto
        }
        document.querySelector("#produtos").innerHTML = html
    }
}

listaProdutos()

function limpaCampos() {
    document.getElementById("nome").value = ""
    document.getElementById("valor").value = ""
    document.getElementById("descricao").value = ""
    document.getElementById("imagem").value = ""
}