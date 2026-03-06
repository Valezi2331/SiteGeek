import { useState } from 'react';
import axios from 'axios';

function App() {
  // Criando os "espaços" na memória para guardar o que você digita
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para enviar os dados para o seu servidor Node.js
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede a página de recarregar
    
    try {
      // Enviando para a porta 3000 que configuramos no backend
      const response = await axios.post('http://localhost:3000/salvar', {
        valor: valor,
        descricao: descricao
      });

      alert('Dados salvos com sucesso!');
      setValor(''); // Limpa o campo
      setDescricao(''); // Limpa o campo
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Painel de Controle - SiteGeek</h2>
      
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Valor (R$ ou Numérico):</label>
          <input 
            type="number" 
            className="form-control" 
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição da Leitura:</label>
          <textarea 
            className="form-control" 
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Salvar no Banco de Dados
        </button>
      </form>
    </div>
  );
}

export default App;