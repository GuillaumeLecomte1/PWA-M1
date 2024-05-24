import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar">
      <span className="menu-toggle" onClick={toggleMenu}>☰</span>
      <ul className={`navbar-nav ${isActive ? 'active' : ''}`}>
        <li className="nav-item"><Link to="/">Accueil</Link></li>
        <li className="nav-item"><Link to="/geolocalisation">Géolocalisation</Link></li>
        <li className="nav-item"><Link to="/camera">Caméra</Link></li>
        <li className="nav-item"><Link to="/telephone">Téléphone</Link></li>
        <li className="nav-item"><Link to="/notification">Notification</Link></li>
        <li className="nav-item"><Link to="/sms">SMS</Link></li>
      </ul>
      <style jsx>{`
        /* Styles de base pour la navigation */
        .navbar {
          background-color: #333;
          overflow: hidden;
        }

        .navbar-nav {
          display: flex;
          justify-content: space-around;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          padding: 14px 20px;
        }

        .nav-item a {
          color: white;
          text-decoration: none;
          text-align: center;
          display: block;
        }

        .nav-item a:hover {
          background-color: #ddd;
          color: black;
        }

        /* Styles pour les écrans plus petits */
        @media screen and (max-width: 600px) {
          .navbar-nav {
            flex-direction: column;
            display: none;
          }

          .navbar-nav.active {
            display: flex;
          }

          .navbar {
            position: relative;
          }

          .menu-toggle {
            display: block;
            cursor: pointer;
            padding: 14px 20px;
            color: white;
            background-color: #333;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
