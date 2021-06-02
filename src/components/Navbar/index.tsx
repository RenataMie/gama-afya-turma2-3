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
           
          <Link to="/">Home</Link>
          <Link to="/criar-conta">Cadastro</Link>
          <Link to="/login">Login</Link>
          </div>
      </NavBarContent>
  );
}

export default NavBar;