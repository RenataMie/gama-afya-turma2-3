import React from 'react';

import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FormEndereco from "../../../components/FormEndereco";

// import { SectionComponent } from './styles';

const Endereco: React.FC = () => {
  return (
    <>
    <NavBar/>
    <div className="container">
   
          <h1>Endereço:</h1>
          <FormEndereco/>
      
      </div>
    <Footer/>
    </>

     
  );
}

export default Endereco;