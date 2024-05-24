import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/">Accueil</Link></li>
        <li className="nav-item"><Link to="/geolocalisation">Géolocalisation</Link></li>
        <li className="nav-item"><Link to="/camera">Caméra</Link></li>
        <li className="nav-item"><Link to="/telephone">Téléphone</Link></li>

        <li className="nav-item"><Link to="/notification">Notification</Link></li>
        <li className="nav-item"><Link to="/sms">SMS</Link></li>

      </ul>
    </nav>
  );
};

export default Navbar;
