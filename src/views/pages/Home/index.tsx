import React from 'react';
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import BuscaPaciente from "../../pages/BuscaPaciente";
import {SectionComponent} from "./styles";

const Home: React.FC = () => {
  return (
    <>
    <NavBar/>
    <div className="container">
    <SectionComponent>
      
        
    <BuscaPaciente />
    </SectionComponent>
    </div>
    <Footer/>
    </>

  );
}

export default Home;