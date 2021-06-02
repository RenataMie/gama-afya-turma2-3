import React from 'react';
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Busca from "../../pages/Busca";
import {SectionComponent} from "./styles";

const Home: React.FC = () => {
  return (
    <>
    <NavBar/>
    <div className="container">
    <SectionComponent>
      
        
        <Busca />
    </SectionComponent>
    </div>
    <Footer/>
    </>

  );
}

export default Home;