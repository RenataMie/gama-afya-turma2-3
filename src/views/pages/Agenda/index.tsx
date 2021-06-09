import React, {useState, useEffect, useCallback, FormEvent} from 'react';
import {useHistory} from "react-router-dom";
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
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

const Agenda: React.FC = () => {


  const history= useHistory();

  const[formDataContent, setFormDataContent]=useState<IAgenRegister>({} as IAgenRegister);
  const [pacienteSearch, setPacienteSearch]=useState([]);
  const [especialistaSearch, setEspecialistaSearch]=useState([]);

  let listaDePacientes = pacienteSearch.map((pac :{id:number, nome:string}) => 
   <option key={pac.id} value={pac.id}>{pac.nome}</option>);
  

  let listaDeEspecialistas = especialistaSearch.map((espe :{id:number, nome:string, profissao_especialista:any, profissao:string}) => 
  <option key={espe.id} value={espe.id}>{espe.nome}, {espe.profissao_especialista.profissao}</option>)


  console.log(formDataContent)
 

  useEffect(
    () => {
    api.get("/pacientes")
    .then(res => setPacienteSearch(res.data))
    .catch(console.error)
  },[])

  useEffect(
    () => {
    api.get("/especialista")
    .then(res => setEspecialistaSearch(res.data))
    .catch(console.error)
  },[])


  const postAgenda= useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
     

      api.post("atendimentos", formDataContent).then(
        response => {
          toast.success("Agendado com sucesso", {
            onClose: () =>  history.push("/")
          })
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
    }, [formDataContent, history]
  );



  return (
    <>
    <NavBar/>
    <div className="container">
    
      
        <form onSubmit={postAgenda}>
        <input type="date" name="data_agendamento" placeholder="informe data de agendamento" onChange={e => setFormDataContent({...formDataContent, data_agendamento: e.target.value})}/>   
        <input type="date" name="data_atendimento" placeholder="Informe data de atendimento" onChange={e => setFormDataContent({...formDataContent, data_atendimento: e.target.value})}/>
        <input type="time" name="hora_atendimento" placeholder="Informe hora do atendimento" onChange={e => setFormDataContent({...formDataContent, hora_atendimento: e.target.value})}/>
        <input type="text" name="valor" placeholder="valor" onChange={e => setFormDataContent({...formDataContent, valor: e.target.value})}/>
        
        <select  name="id_pac" onChange={e => setFormDataContent({...formDataContent, id_paciente: e.target.value})}> 
        <option> selecione um paciente</option>
        {listaDePacientes} 
        </select> 
        
        <select  name="id_espe" onChange={e => setFormDataContent({...formDataContent, id_especialista: e.target.value})}> 
        <option> selecione um especialista</option>
        {listaDeEspecialistas} 
        </select>

        <select  name="status" onChange={e => setFormDataContent({...formDataContent, status: e.target.value})}> 
        <option> selecione um status</option>
        <option> Agendado </option>
        <option> Cancelado</option>
        <option> Realizado</option>
        </select>


        <input type="submit" value="agendar"/>
      </form>
   
    
    </div>
    <Footer/>
    </>

  );
}

export default Agenda;