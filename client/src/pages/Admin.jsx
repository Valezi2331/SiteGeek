import { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [form, setForm] = useState({ nome: '', preco: '', categoria: '', imagem_url: '', estoque: '' });

  const salvarProduto = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/produtos', form);
    alert("Produto Geeks postado!");
    setForm({ nome: '', preco: '', categoria: '', imagem_url: '', estoque: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastrar Novo Item</h2>
      <form onSubmit={salvarProduto}>
        <input placeholder="Nome (Ex: Action Figure Luffy)" onChange={e => setForm({...form, nome: e.target.value})} value={form.nome} /><br/>
        <input type="number" placeholder="Preço" onChange={e => setForm({...form, preco: e.target.value})} value={form.preco} /><br/>
        <input placeholder="URL da Imagem" onChange={e => setForm({...form, imagem_url: e.target.value})} value={form.imagem_url} /><br/>
        <select onChange={e => setForm({...form, categoria: e.target.value})} value={form.categoria}>
          <option value="">Selecione a Categoria</option>
          <option value="Cartas">Cartas (Magic/Pokémon)</option>
          <option value="Miniaturas">Miniaturas/Action Figures</option>
        </select><br/>
        <button type="submit">Postar na Loja</button>
      </form>
    </div>
  );
}

export default Admin;