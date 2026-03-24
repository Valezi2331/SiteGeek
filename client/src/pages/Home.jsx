import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Busca os produtos cadastrados no seu servidor
    axios.get('http://localhost:3001/produtos')
      .then(res => setProdutos(res.data))
      .catch(err => console.error("Erro ao buscar produtos", err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cards e Miniaturas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {produtos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={p.imagem_url} alt={p.nome} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <h3>{p.nome}</h3>
            <p>R$ {p.preco.toFixed(2)}</p>
            <button style={{ backgroundColor: '#ff4500', color: 'white', border: 'none', padding: '10px', width: '100%' }}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;