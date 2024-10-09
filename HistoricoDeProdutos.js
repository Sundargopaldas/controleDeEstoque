function carregarHistorico() {
            return JSON.parse(localStorage.getItem('historicoProdutos')) || [];
        }

        function salvarHistorico(historico) {
            localStorage.setItem('historicoProdutos', JSON.stringify(historico));
        }

        function deletarItemHistorico(index) {
            if (confirm('Tem certeza que deseja deletar este item do histórico?')) {
                let historico = carregarHistorico();
                historico.splice(index, 1);
                salvarHistorico(historico);
                atualizarTabelaHistorico();
            }
        }

        function atualizarTabelaHistorico() {
            const tabela = document.getElementById("historicoTable").getElementsByTagName('tbody')[0];
            tabela.innerHTML = '';
            
            const historico = carregarHistorico();
            historico.forEach((item, index) => {
                const novaLinha = tabela.insertRow();
                ['cliente', 'entrada', 'saida', 'estoque', 'status', 'dataRegistro', 'acao'].forEach(key => {
                    const celula = novaLinha.insertCell();
                    celula.textContent = item[key];
                });

                const celulaBotao = novaLinha.insertCell();
                const botaoDeletar = document.createElement('button');
                botaoDeletar.textContent = 'Deletar';
                botaoDeletar.className = 'btn-deletar';
                botaoDeletar.onclick = () => deletarItemHistorico(index);
                celulaBotao.appendChild(botaoDeletar);
            });
        }

        document.addEventListener("DOMContentLoaded", atualizarTabelaHistorico);
    