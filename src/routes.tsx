import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import PrivateRoutes from "./private.routes";
import Home from "./views/pages/Home";
import Login from "./views/pages/Login";
import SignUp from "./views/pages/SignUp";
import Endereco from "./views/pages/Endereco";
import Dash from "./views/pages/Dash";
import CadastroEsp from "./views/pages/CadastroEsp";
import BuscaEsp from './views/pages/BuscaEspe';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/especialistas" exact component={BuscaEsp}/>
            <Route path="/login" component={Login}/>
            <Route path="/criar-conta" component={SignUp}/>
            <Route path="/criar-medico" component={CadastroEsp}/>
            <Route path="/endereco/:id" children={<Endereco />}/>
            <Route path="/:id" exact children={<Dash/>}/>
            <Route path="/:id/edit" exact children={<SignUp/>}/>

        </Switch>
    </BrowserRouter>
  );
}

export default Routes;