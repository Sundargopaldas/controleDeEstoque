// Autenticação simples de login
// Simulação de armazenamento em localStorage para usuários
const users = JSON.parse(localStorage.getItem('users')) || [];

// Lógica de alternância entre criar conta e login
document.getElementById('login-toggle').addEventListener('click', function() {
  const isLogin = document.getElementById('submit-btn').textContent === 'Login';
  
  if (isLogin) {
    document.getElementById('login-title').textContent = 'Criar Conta';
    document.getElementById('submit-btn').textContent = 'Criar Conta';
    document.getElementById('login-toggle').innerHTML = 'Já tem uma conta? <a href="#">Faça login</a>';
  } else {
    document.getElementById('login-title').textContent = 'Login';
    document.getElementById('submit-btn').textContent = 'Login';
    document.getElementById('login-toggle').innerHTML = 'Não tem conta? <a href="#">Crie uma agora</a>';
  }
});

// Função de autenticação
document.getElementById('submit-btn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (document.getElementById('submit-btn').textContent === 'Criar Conta') {
    // Criação de conta
    if (username && email && password) {
      const userExists = users.some(user => user.username === username || user.email === email);
      if (!userExists) {
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Conta criada com sucesso! Agora faça login.');
        document.getElementById('login-title').textContent = 'Login';
        document.getElementById('submit-btn').textContent = 'Login';
        document.getElementById('login-toggle').innerHTML = 'Não tem conta? <a href="#">Crie uma agora</a>';
      } else {
        alert('Usuário ou email já cadastrado.');
      }
    } else {
      alert('Preencha todos os campos.');
    }
  } else {
    // Login
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      document.getElementById('login-page').style.display = 'none';
      document.getElementById('estoque-page').style.display = 'block';
    } else {
      alert('Usuário ou senha incorretos.');
    }
  }
});

// Filtro de clientes: Preencher o campo de cliente automaticamente
document.getElementById('clienteList').addEventListener('change', function() {
  const clienteSelecionado = document.getElementById('clienteList').value;
  document.getElementById('cliente').value = clienteSelecionado;
});

// Função para adicionar os dados na tabela e calcular o estoque
document.getElementById('adicionar').addEventListener('click', function() {
  const cliente = document.getElementById('cliente').value;
  const produto = document.getElementById('produto').value;
  const entrada = parseInt(document.getElementById('entrada').value);
  const saida = parseInt(document.getElementById('saida').value);
  const estoque = entrada - saida;
  const data = new Date().toLocaleString();

  if (cliente && produto && !isNaN(entrada) && !isNaN(saida)) {
    const tabela = document.getElementById('tabelaEstoque').querySelector('tbody');
    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
      <td>${cliente}</td>
      <td>${produto}</td>
      <td>${entrada}</td>
      <td>${saida}</td>
      <td>${estoque}</td>
      <td>${data}</td>
      <td><button class="remover">Remover</button></td>
    `;

    // Adicionar evento para remover o item da tabela
    novaLinha.querySelector('.remover').addEventListener('click', function() {
      this.parentElement.parentElement.remove();
      salvarDados();
    });

    salvarDados(); // Salvar os dados no localStorage
  } else {
    alert('Preencha todos os campos corretamente!');
  }
});

// Função para salvar os dados no localStorage
function salvarDados() {
  const tabela = document.getElementById('tabelaEstoque').querySelector('tbody');
  const rows = [...tabela.rows].map(row => ({
    cliente: row.cells[0].textContent,
    produto: row.cells[1].textContent,
    entrada: row.cells[2].textContent,
    saida: row.cells[3].textContent,
    estoque: row.cells[4].textContent,
    data: row.cells[5].textContent
  }));
  localStorage.setItem('tabelaEstoque', JSON.stringify(rows));
}

// Função para carregar os dados do localStorage ao iniciar a página
function carregarDados() {
  const dados = JSON.parse(localStorage.getItem('tabelaEstoque')) || [];
  const tabela = document.getElementById('tabelaEstoque').querySelector('tbody');
  
  dados.forEach(dado => {
    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
      <td>${dado.cliente}</td>
      <td>${dado.produto}</td>
      <td>${dado.entrada}</td>
      <td>${dado.saida}</td>
      <td>${dado.estoque}</td>
      <td>${dado.data}</td>
      <td><button class="remover">Remover</button></td>
    `;
    novaLinha.querySelector('.remover').addEventListener('click', function() {
      this.parentElement.parentElement.remove();
      salvarDados();
    });
  });
}

document.addEventListener('DOMContentLoaded', carregarDados);
