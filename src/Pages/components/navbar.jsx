import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GeolocationPage from './GeolocationPage';
import HomePage from './HomePage'; // Supposez que vous ayez un composant pour la page d'accueil
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar commune à toutes les pages */}
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/">Accueil</Link></li>
            <li className="nav-item"><Link to="/geolocalisation">Géolocalisation</Link></li>
          </ul>
        </nav>

        {/* Définition des routes pour chaque page */}
        <Routes>
          <Route path="/geolocalisation" element={<GeolocationPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
