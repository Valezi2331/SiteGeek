import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import React from 'react';
import ReactDOM from 'react-dom/client';


function App() {
  return (
    <Router>
      <nav style={{ padding: '15px', background: '#222', color: 'white', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'gold', fontWeight: 'bold', textDecoration: 'none' }}>SITE GEEK</Link>
        <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>PAINEL ADM</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
export default App;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);