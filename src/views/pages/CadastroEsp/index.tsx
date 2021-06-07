import React from 'react';

import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FormEspe from "../../../components/FormEspe";


const SignUp: React.FC = () => {

  
  return (
    <>
    <NavBar/>
    <div className="container">
    
          <h1>Dados Pessoais:</h1>
          <FormEspe/>
          
      
      </div>
    <Footer/>
    </>

     
  );
}

export default SignUp;