import { useState } from 'react';
import axios from 'axios';

function App() {
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia para o seu servidor na porta 3001
      await axios.post('http://localhost:3001/salvar', {
        valor: valor,
        descricao: descricao
      });
      alert('Dados salvos com sucesso!');
      setValor('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Painel SiteGeek</h1>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div>
          <label>Valor:</label><br/>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
        </div><br/>
        <div>
          <label>Descrição:</label><br/>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div><br/>
        <button type="submit">Salvar no Banco de Dados</button>
      </form>
    </div>
  );
}

export default App;