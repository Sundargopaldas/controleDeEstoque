document.addEventListener("DOMContentLoaded", function() {
  const produtoInput = document.getElementById('produto');
  const entradaInput = document.getElementById('entrada');
  const saidaInput = document.getElementById('saida');
  const estoqueInput = document.getElementById('estoque');
  const clienteInput = document.getElementById('cliente');
  const enviarBtn = document.getElementById('enviar');
  const tabelaEstoque = document.getElementById('tabelaEstoque').getElementsByTagName('tbody')[0];

  // Carrega os dados salvos no localStorage
  const registros = JSON.parse(localStorage.getItem('estoque')) || [];

  // Atualiza a tabela com os dados salvos
  registros.forEach(registro => adicionarLinhaTabela(registro));

  // Calcula o estoque automaticamente quando entrada e saída são preenchidos
  entradaInput.addEventListener('input', atualizarEstoque);
  saidaInput.addEventListener('input', atualizarEstoque);

  function atualizarEstoque() {
    const entrada = parseInt(entradaInput.value) || 0;
    const saida = parseInt(saidaInput.value) || 0;
    estoqueInput.value = entrada - saida;
  }

  // Adiciona o registro na tabela e salva no localStorage
  enviarBtn.addEventListener('click', function() {
    const produto = produtoInput.value;
    const entrada = parseInt(entradaInput.value) || 0;
    const saida = parseInt(saidaInput.value) || 0;
    const estoque = entrada - saida;
    const cliente = clienteInput.value;
    const data = new Date().toLocaleDateString();

    const registro = { produto, entrada, saida, estoque, cliente, data };

    // Salva no localStorage
    registros.push(registro);
    localStorage.setItem('estoque', JSON.stringify(registros));

    // Adiciona na tabela
    adicionarLinhaTabela(registro);

    // Limpa os campos
    produtoInput.value = '';
    entradaInput.value = '';
    saidaInput.value = '';
    estoqueInput.value = '';
    clienteInput.value = '';
  });

  function adicionarLinhaTabela(registro) {
    const novaLinha = tabelaEstoque.insertRow();

    novaLinha.insertCell(0).textContent = registro.produto;
    novaLinha.insertCell(1).textContent = registro.entrada;
    novaLinha.insertCell(2).textContent = registro.saida;
    novaLinha.insertCell(3).textContent = registro.estoque;
    novaLinha.insertCell(4).textContent = registro.cliente;
    novaLinha.insertCell(5).textContent = registro.data;

    const acaoCell = novaLinha.insertCell(6);
    const removerBtn = document.createElement('button');
    removerBtn.textContent = 'Remover';
    removerBtn.classList.add('remover');
    removerBtn.addEventListener('click', function() {
      tabelaEstoque.deleteRow(novaLinha.rowIndex - 1);

      // Atualiza o localStorage
      const index = registros.indexOf(registro);
      registros.splice(index, 1);
      localStorage.setItem('estoque', JSON.stringify(registros));
    });

    acaoCell.appendChild(removerBtn);
  }
});
