import React from 'react';

import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FormSignUp from "../../../components/FormSignUp";


import { SectionComponent } from './styles';

const SignUp: React.FC = () => {

  
  return (
    <>
    <NavBar/>
    <div className="container">
    <SectionComponent>
          <h1>Dados Pessoais:</h1>
          <FormSignUp/>
          
      </SectionComponent>
      </div>
    <Footer/>
    </>

     
  );
}

export default SignUp;