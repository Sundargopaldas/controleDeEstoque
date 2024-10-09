// Função para carregar produtos do localStorage
function carregarProdutos() {
    return JSON.parse(localStorage.getItem('produtos')) || [];
}

// Função para salvar produtos no localStorage
function salvarProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Função para carregar histórico de produtos
function carregarHistorico() {
    return JSON.parse(localStorage.getItem('historicoProdutos')) || [];
}

// Função para salvar histórico de produtos
function salvarHistorico(historico) {
    localStorage.setItem('historicoProdutos', JSON.stringify(historico));
}

// Função para calcular o estoque e determinar o status
function calcularEstoqueEStatus(entrada, saida) {
    const estoque = entrada - saida;
    const status = estoque <= 200 ? "Baixo" : "Alto";
    return { estoque, status };
}

// Função para adicionar um produto à tabela
function adicionarProdutoNaTabela(produto, index) {
    const tabela = document.getElementById("produtosTable").getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    
    ['cliente', 'entrada', 'saida', 'estoque', 'status'].forEach(key => {
        const celula = novaLinha.insertCell();
        celula.textContent = produto[key];
    });

    const celulaBotao = novaLinha.insertCell();
    const botaoDeletar = document.createElement('button');
    botaoDeletar.textContent = 'Deletar';
    botaoDeletar.className = 'btn-deletar';
    botaoDeletar.onclick = () => deletarProduto(index);
    celulaBotao.appendChild(botaoDeletar);
}

// Função para atualizar a tabela com todos os produtos
function atualizarTabelaProdutos() {
    const tabela = document.getElementById("produtosTable").getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';
    
    const produtos = carregarProdutos();
    produtos.forEach((produto, index) => adicionarProdutoNaTabela(produto, index));
}

// Função para lidar com o envio do formulário
document.getElementById("produtoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const entrada = parseInt(document.getElementById("entrada").value);
    const saida = parseInt(document.getElementById("saida").value);

    const { estoque, status } = calcularEstoqueEStatus(entrada, saida);

    const produto = { 
        cliente, 
        entrada, 
        saida, 
        estoque, 
        status, 
        dataRegistro: new Date().toISOString() 
    };

    // Adicionar o novo produto à lista e salvar no localStorage
    const produtos = carregarProdutos();
    produtos.push(produto);
    salvarProdutos(produtos);

    // Adicionar ao histórico
    const historico = carregarHistorico();
    historico.push({ ...produto, acao: 'Adicionado' });
    salvarHistorico(historico);

    // Atualizar a tabela
    atualizarTabelaProdutos();

    // Atualizar os campos de estoque e status no formulário
    document.getElementById("estoque").value = estoque;
    document.getElementById("status").value = status;

    // Limpar o formulário após o envio
    document.getElementById("cliente").value = "";
    document.getElementById("entrada").value = "";
    document.getElementById("saida").value = "";
});

// Função para calcular o estoque e status em tempo real
function atualizarEstoqueEStatus() {
    const entrada = parseInt(document.getElementById("entrada").value) || 0;
    const saida = parseInt(document.getElementById("saida").value) || 0;
    const { estoque, status } = calcularEstoqueEStatus(entrada, saida);
    
    document.getElementById("estoque").value = estoque;
    document.getElementById("status").value = status;
}

// Adicionar event listeners para atualização em tempo real
document.getElementById("entrada").addEventListener("input", atualizarEstoqueEStatus);
document.getElementById("saida").addEventListener("input", atualizarEstoqueEStatus);

// Carregar produtos existentes quando a página é aberta
document.addEventListener("DOMContentLoaded", atualizarTabelaProdutos);

// Função para deletar um produto
function deletarProduto(index) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        let produtos = carregarProdutos();
        const produtoDeletado = produtos[index];
        produtos.splice(index, 1);
        salvarProdutos(produtos);

        // Adicionar ao histórico como deletado
        const historico = carregarHistorico();
        historico.push({ ...produtoDeletado, acao: 'Deletado', dataDeleção: new Date().toISOString() });
        salvarHistorico(historico);

        atualizarTabelaProdutos();
    }
}