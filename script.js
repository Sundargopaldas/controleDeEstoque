document.addEventListener("DOMContentLoaded", function() {
    const produtoInput = document.getElementById('produto');
    const entradaInput = document.getElementById('entrada');
    const saidaInput = document.getElementById('saida');
    const estoqueInput = document.getElementById('estoque');
    const clienteInput = document.getElementById('cliente');
    const enviarBtn = document.getElementById('enviar');
    const tabelaEstoque = document.getElementById('tabelaEstoque').getElementsByTagName('tbody')[0];

    let registros = JSON.parse(localStorage.getItem('estoque')) || [];

    function atualizarTabela() {
        tabelaEstoque.innerHTML = '';
        registros.forEach((registro, index) => adicionarLinhaTabela(registro, index));
    }

    function atualizarEstoque() {
        const entrada = parseInt(entradaInput.value) || 0;
        const saida = parseInt(saidaInput.value) || 0;
        estoqueInput.value = entrada - saida;
    }

    function validarFormulario() {
        return produtoInput.value.trim() !== '' && 
               entradaInput.value.trim() !== '' && 
               saidaInput.value.trim() !== '' && 
               clienteInput.value.trim() !== '';
    }

    function limparFormulario() {
        produtoInput.value = '';
        entradaInput.value = '';
        saidaInput.value = '';
        estoqueInput.value = '';
        clienteInput.value = '';
    }

    entradaInput.addEventListener('input', atualizarEstoque);
    saidaInput.addEventListener('input', atualizarEstoque);

    enviarBtn.addEventListener('click', function() {
        if (!validarFormulario()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const registro = {
            produto: produtoInput.value,
            entrada: parseInt(entradaInput.value),
            saida: parseInt(saidaInput.value),
            estoque: parseInt(estoqueInput.value),
            cliente: clienteInput.value,
            data: new Date().toLocaleDateString()
        };

        registros.push(registro);
        localStorage.setItem('estoque', JSON.stringify(registros));
        
        adicionarLinhaTabela(registro, registros.length - 1);
        limparFormulario();
    });

    function adicionarLinhaTabela(registro, index) {
        const novaLinha = tabelaEstoque.insertRow();
        novaLinha.innerHTML = `
            <td class="px-4 py-2">${registro.produto}</td>
            <td class="px-4 py-2">${registro.entrada}</td>
            <td class="px-4 py-2">${registro.saida}</td>
            <td class="px-4 py-2">${registro.estoque}</td>
            <td class="px-4 py-2">${registro.cliente}</td>
            <td class="px-4 py-2">${registro.data}</td>
            <td class="px-4 py-2">
                <button class="remover">Remover</button>
            </td>
        `;

        novaLinha.querySelector('.remover').addEventListener('click', function() {
            registros.splice(index, 1);
            localStorage.setItem('estoque', JSON.stringify(registros));
            atualizarTabela();
        });
    }

    atualizarTabela();
});