import React from 'react';
import {Link} from "react-router-dom";

import {NavBarContent} from "./style";
import LogoAfya from "../../assets/img/download.png";

// import { Container } from './styles';

const NavBar: React.FC = () => {
  return (
      <NavBarContent>
        <Link to="/">
            <img src={LogoAfya} alt="Logo Afya" />
          </Link>
       
        <div className="links-content">
           
          
          <Link to="/agenda">Agenda</Link>
          <Link to="/pacientes">Busca Paci</Link>
          <Link to="/especialistas">Busca Espe</Link>
          <Link to="/criar-conta">Cadastro Paciente</Link>
          <Link to="/criar-medico">Cadastro Especialista</Link>
          <Link to="/login">Login</Link>
          </div>
      </NavBarContent>
  );
}

export default NavBar;