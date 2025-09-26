import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaHome, FaBookOpen, FaUsers, FaUser } from "react-icons/fa";
import logo from "../assets/carrito.png"; // 👈 tu logo

import "../styles/Navbar.css"; // 👈 Estilos personalizados

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom shadow-sm">
      <div className="container-fluid">

        {/* LOGO (centrado con mx-auto) */}
        <NavLink className="navbar-brand d-flex align-items-center mx-auto" to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </NavLink>

        {/* Botón responsive (móvil) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS DE NAVEGACIÓN */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link nav-text" to="/">
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-text" to="/catalog">
                <FaBookOpen className="me-2" /> Catálogo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-text" to="/clientes">
                <FaUsers className="me-2" /> Clientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-text" to="/usuarios">
                <FaUser className="me-2" /> Usuarios
              </NavLink>
            </li>
          </ul>

          {/* ICONO DE CARRITO */}
          <div className="d-flex align-items-center">
            <NavLink className="nav-link nav-text" to="/cart">
            <FaShoppingCart className="cart-icon" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
