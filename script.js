// codigo do login

// Função para manipular o envio do formulário de login
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verifica se o usuário existe no localStorage
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser) {
        if (storedUser.password === password && storedUser.username === username) {
            alert("Login bem-sucedido!");
            window.location.href = "PaginaDadosClientes.html";
        } else {
            alert("Usuário ou senha incorretos.");
        }
    } else {
        alert("Usuário não encontrado. Por favor, cadastre-se.");
    }
});

// Função para manipular o envio do formulário de cadastro
document.getElementById("signupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const newUsername = document.getElementById("newUsername").value;
    const newEmail = document.getElementById("newEmail").value;
    const newPassword = document.getElementById("newPassword").value;

    // Cria um objeto com os dados do usuário
    const userData = {
        username: newUsername,
        email: newEmail,
        password: newPassword
    };

    // Armazena os dados no localStorage com a chave sendo o email
    localStorage.setItem(newEmail, JSON.stringify(userData));

    alert("Cadastro realizado com sucesso!");

    // Redireciona para a página de login após o cadastro
    window.location.href = "index.html";
});

// Redirecionar para a página de cadastro
document.getElementById("createAccountLink")?.addEventListener("click", function () {
    window.location.href = "signup.html";
});

// Código para página cadastro de clientes
document.getElementById("clienteForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const logoCliente = document.getElementById("logoCliente").files[0];
    const idCliente = document.getElementById("idCliente").value;
    const nomeCliente = document.getElementById("nomeCliente").value;

    const reader = new FileReader();
    reader.onload = function(e) {
        // Criamos um objeto com os dados do cliente
        const cliente = {
            logo: e.target.result,  // Imagem convertida para base64
            id: idCliente,
            nome: nomeCliente
        };

        // Salvamos os dados no localStorage
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        clientes.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(clientes));

        // Redirecionamos o usuário para a página PaginaDadosClientes.html
        window.location.href = "PaginaDadosClientes.html";
    };

    if (logoCliente) {
        reader.readAsDataURL(logoCliente);
    } else {
        // Se não houver imagem, ainda envia o resto dos dados
        const cliente = {
            logo: null,  // Sem imagem
            id: idCliente,
            nome: nomeCliente
        };

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        clientes.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        window.location.href = "PaginaDadosClientes.html";
    }
});

// Código da página DadosClientes.html
// ... (mantenha o código existente) ...

// Função para exibir os dados dos clientes
// Função para carregar e exibir os dados dos clientes
function carregarDadosClientes() {
    const dadosClientes = document.getElementById("dadosClientes");
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    dadosClientes.innerHTML = "";

    clientes.forEach((cliente, index) => {
        const clienteItem = document.createElement("div");
        clienteItem.className = "cliente-item";

        const img = document.createElement("img");
        img.src = cliente.logo || 'placeholder.png';
        img.alt = `Logo de ${cliente.nome}`;
        clienteItem.appendChild(img);

        const infoCliente = document.createElement("span");
        infoCliente.className = "cliente-info";
        infoCliente.textContent = `ID: ${cliente.id}, Nome: ${cliente.nome}`;
        clienteItem.appendChild(infoCliente);

        const btnDelete = document.createElement("button");
        btnDelete.className = "btn-delete";
        btnDelete.textContent = "Deletar";
        btnDelete.onclick = () => deletarCliente(index);
        clienteItem.appendChild(btnDelete);

        dadosClientes.appendChild(clienteItem);
    });

    // Salva os clientes no localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

// Função para deletar um cliente
function deletarCliente(index) {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    
    if (confirm("Tem certeza que deseja deletar este cliente?")) {
        clientes.splice(index, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        carregarDadosClientes(); // Atualiza a exibição após deletar
    }
}

// Carrega os dados dos clientes quando a página é carregada
document.addEventListener("DOMContentLoaded", carregarDadosClientes);