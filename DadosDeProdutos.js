
        
      // DadosDeProdutos.js

// Função para carregar a tabela de produtos
function carregarTabelaProdutos() {
    const tableBody = document.getElementById('productTableBody');
    if (!tableBody) {
        console.error('Elemento da tabela não encontrado');
        return;
    }

    tableBody.innerHTML = ''; // Limpa a tabela

    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    products.forEach((product, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${product.cliente || ''}</td>
            <td>${product.produto || ''}</td>
            <td>${product.id || ''}</td>
            <td>${product.descricao || ''}</td>
            <td>${product.imagem ? `<img src="${product.imagem}" alt="Imagem do produto" style="width:50px; height:50px;">` : 'Sem imagem'}</td>
            <td>${product.entrada || ''}</td>
            <td>${product.saida || ''}</td>
            <td>${product.estoque || ''}</td>
            <td>${product.status || ''}</td>
            <td><button onclick="removerProduto(${index})">Remover</button></td>
        `;
    });

    console.log(`Carregados ${products.length} produtos na tabela.`);
}

// Função para remover um produto
function removerProduto(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Atualizar o histórico
    let historico = JSON.parse(localStorage.getItem('historicoMovimentacoes')) || [];
    historico.splice(index, 1);
    localStorage.setItem('historicoMovimentacoes', JSON.stringify(historico));
    
    carregarTabelaProdutos(); // Recarrega a tabela
}

// Carregar a tabela quando a página for carregada
window.addEventListener('load', carregarTabelaProdutos);

// Função para editar um produto (opcional, caso você queira adicionar esta funcionalidade)
function editarProduto(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    // Aqui você pode implementar a lógica para abrir um formulário de edição
    // e preencher com os dados do produto selecionado
    
    // Após a edição, você pode atualizar o produto na lista e no histórico
    products[index] = produtoEditado; // produtoEditado seria o objeto com os dados atualizados
    localStorage.setItem('products', JSON.stringify(products));
    
    atualizarHistorico(produtoEditado);
    
    carregarTabelaProdutos(); // Recarrega a tabela
}

// Função para atualizar o histórico (copiada do HistoricoDeMovimentacao.js)
function atualizarHistorico(produtoAtualizado) {
    let historico = JSON.parse(localStorage.getItem('historicoMovimentacoes')) || [];
    
    const index = historico.findIndex(item => item.id === produtoAtualizado.id);
    
    if (index !== -1) {
        historico[index] = {
            ...produtoAtualizado,
            data: new Date().toLocaleString()
        };
        localStorage.setItem('historicoMovimentacoes', JSON.stringify(historico));
    } else {
        adicionarAoHistorico(produtoAtualizado);
    }
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