import React, {useState, useEffect, useCallback, FormEvent} from 'react';
import {useHistory} from "react-router-dom";
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {SectionComponent} from "./styles";
import api from "../../../service/api";
import {toast} from "react-toastify";


interface IAgenRegister{
  data_agendamento: string
  data_atendimento: string,
  hora_atendimento: string,
  valor:string,
  status: string,
  id_paciente: number|string,
  id_especialista: number|string,
  
}

const Home: React.FC = () => {


  const history= useHistory();

  const[formDataContent, setFormDataContent]=useState<IAgenRegister>({} as IAgenRegister);
  const [atendimentos, setAtendimentos]=useState([]);
  const [especialistaSearch, setEspecialistaSearch]=useState([]);

  // let listaDePacientes = pacienteSearch.map((pac :{id:number, nome:string}) => 
  //  <option key={pac.id} value={pac.id}>{pac.nome}</option>);
  

  // let listaDeEspecialistas = especialistaSearch.map((espe :{id:number, nome:string, profissao_especialista:any, profissao:string}) => 
  // <option key={espe.id} value={espe.id}>{espe.nome}, {espe.profissao_especialista.profissao}</option>)


  console.log(formDataContent)
 

  useEffect(
    () => {
    api.get("/atendimentos/hoje")
    .then(res => setAtendimentos(res.data))
    .catch(console.error)
  },[])

  // useEffect(
  //   () => {
  //   api.get("/especialista")
  //   .then(res => setEspecialistaSearch(res.data))
  //   .catch(console.error)
  // },[])


  // const postAgenda= useCallback(
  //   (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
     

  //     api.post("atendimentos", formDataContent).then(
  //       response => {
  //         toast.success("Agendado com sucesso", {
  //           onClose: () =>  history.push("/")
  //         })
  //       }
  //     ).catch(e => toast.error("Ops, algo deu errado :("))
  //   }, [formDataContent, history]
  // );



  return (
    <>
    <NavBar/>
    <div className="container">
    <SectionComponent>
      
        <h1>Agenda do dia: </h1>

        {atendimentos.map((atend: {hora_atendimento:string, id_paciente:number}) => {
        return(
          <>
          <p>{atend.hora_atendimento}</p>
          <p>Paciente: {atend.id_paciente}</p>
          {/* <p>Especialista: {atend.especialista_atendimento.nome}</p> */}
          </>
        )}
        )}
   
    </SectionComponent>
    </div>
    <Footer/>
    </>

  );
}

export default Home;