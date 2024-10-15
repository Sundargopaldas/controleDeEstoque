
  // produtos.js

// Função para pré-popular a lista de produtos
function prePopularProdutos() {
    const produtosIniciais = ['', '', ''];
    let produtosUnicos = JSON.parse(localStorage.getItem('produtos_unicos')) || [];
    
    produtosIniciais.forEach(produto => {
        if (!produtosUnicos.includes(produto)) {
            produtosUnicos.push(produto);
        }
    });
    
    localStorage.setItem('produtos_unicos', JSON.stringify(produtosUnicos));
}

// Função para carregar os clientes no select
function carregarClientes() {
    const selectCliente = document.getElementById('cliente');
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        selectCliente.appendChild(option);
    });
}

// Função para carregar os produtos no select
function carregarProdutos() {
    const selectProduto = document.getElementById('produto');
    const produtos = JSON.parse(localStorage.getItem('produtos_unicos')) || [];

    // Limpar opções existentes, mantendo as opções padrão
    selectProduto.innerHTML = `
        <option value="novo">Selecione um produto</option>
        <option value="saco kraft">saco kraft</option>
        <option value="sacola kraft"> sacola kraft g</option>
        <option value="cestinho">cestinho</option>
        <option value="cx p/9 doces">cx p/9 doces</option>
        <option value="cx p/4 trufas">cx p/4 trufas</option>
        <option value="cx p/b choc.">cx p/b choc.</option>
        <option value="sacola p">sacola p</option>
    `;

    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto;
        option.textContent = produto;
        selectProduto.appendChild(option);
    });
}

// Função para salvar produtos únicos
function salvarProdutoUnico(nomeProduto) {
    let produtosUnicos = JSON.parse(localStorage.getItem('produtos_unicos')) || [];
    if (!produtosUnicos.includes(nomeProduto)) {
        produtosUnicos.push(nomeProduto);
        localStorage.setItem('produtos_unicos', JSON.stringify(produtosUnicos));
    }
}

// Carregar clientes e produtos quando a página for carregada
window.addEventListener('load', () => {
    prePopularProdutos();
    carregarClientes();
    carregarProdutos();
});

// Mostrar/esconder campo de novo produto
document.getElementById('produto').addEventListener('change', function() {
    const novoProdutoDiv = document.querySelector('.novo-produto');
    if (this.value === 'novo') {
        novoProdutoDiv.style.display = 'block';
    } else {
        novoProdutoDiv.style.display = 'none';
    }
});

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const product = {};
    
    formData.forEach((value, key) => {
        if (key !== 'imagem') {
            product[key] = value;
        }
    });
    
    // Se for um novo produto, use o nome do novo produto
    if (product.produto === 'novo') {
        product.produto = product.novoProduto;
    }
    
    // Calcular o estoque
    product.estoque = parseInt(product.entrada) - parseInt(product.saida);
    
    // Definir o status
    product.status = product.estoque <= 200 ? 'Baixo' : 'Normal';
    
    // Lidar com a imagem
    const imageFile = formData.get('imagem');
    if (imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            product.imagem = event.target.result;
            saveProduct(product);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveProduct(product);
    }
});

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Adicionar ao histórico
    adicionarAoHistorico(product);
    
    // Salvar o nome do produto na lista de produtos únicos
    salvarProdutoUnico(product.produto);
    
    alert('Produto cadastrado com sucesso!');
    window.location.href = 'paginaDadosDeProdutos.html';
    document.getElementById('productForm').reset();

    // Atualizar a lista de produtos
    carregarProdutos();
}

// Função para adicionar ao histórico (copiada do HistoricoDeMovimentacao.js)
function adicionarAoHistorico(produto) {
    let historico = JSON.parse(localStorage.getItem('historicoMovimentacoes')) || [];
    
    const novoItem = {
        ...produto,
        data: new Date().toLocaleString()
    };
    
    historico.push(novoItem);
    localStorage.setItem('historicoMovimentacoes', JSON.stringify(historico));
}