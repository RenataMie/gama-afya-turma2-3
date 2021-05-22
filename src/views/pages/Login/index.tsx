import React from 'react';

import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FormLogin from "../../../components/FormLogin";
import { SectionComponent } from './styles';


const Login: React.FC = () => {
  return (
    <>
    <NavBar/>
    <div className="container">
    <SectionComponent>
      <FormLogin/>
    </SectionComponent>
    </div>
    <Footer/>
    </>
  
  );
}

export default Login;