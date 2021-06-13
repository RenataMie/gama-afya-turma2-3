import React, {useState, useEffect, useCallback, FormEvent} from 'react';
import {useHistory, useParams} from "react-router-dom";
import api from "../../../service/api";
import {toast} from "react-toastify";


interface Iprontuario {
  id:number,
  data_abertura: string,
  id_paciente: number|string,
  paciente_prontuario: {
    nome: string
  }
  
}

interface Iprontuario2 {
  data_abertura: string,
  
}


// import { Container } from './styles';

const Prontuario: React.FC = () => {

  const history= useHistory();
  let { id }  = useParams<{ id: string }>();
  let paciente 

  const [formData, setFormData] = useState<Iprontuario2>({} as Iprontuario2);
  const [prontuario, setProntuario]= useState<Iprontuario>({} as Iprontuario);
  console.log(prontuario)

  useEffect(
    () => {
    api.get("/prontuarios/" + id)
    .then(res => setProntuario(res.data))
    .catch(console.error)
  },[id])

  // if(prontuario === null) {
  //   return paciente = {}

  // } else {

  // let paciente =  prontuario.paciente_prontuario
  // if (typeof(paciente)==="undefined"){
  //   // console.log("endereco is undefined!")
  //   paciente = {}
  // }}


  const postProntuario= useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
     
      const formAllData = {...formData, id_paciente: parseInt(id)}
      console.log(formAllData)
      api.post("prontuarios", formAllData).then(
        response => {
          toast.success("Prontuario criado com sucesso", {
            onClose: () =>  history.push(`/${id}`)
          })
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
    }, [formData, history, id]
  );

console.log("debug prontuario ", prontuario)
// console.log("debug teste ob vazio ", Object.keys(prontuario).length)


if(prontuario === null){
  return (
      <div>
          <h1>Prontuario</h1>
          <form onSubmit={postProntuario}>
            <input type="date" name="data_abertura" onChange={e => setFormData({...formData, data_abertura: e.target.value})}/>
            <input type="submit" value="abrir prontuario"/>
          </form>
      </div>
  )
}else if (Object.keys(prontuario).length === 0){
  return (
    <div>
        <h1>Prontuario</h1>
        <form onSubmit={postProntuario}>
          <input type="date" name="data_abertura" onChange={e => setFormData({...formData, data_abertura: e.target.value})}/>
          <input type="submit" value="abrir prontuario"/>
        </form>
    </div>
)
} else {
  
  return (
  
    <div>
        <h1>Prontuario: {prontuario.paciente_prontuario.nome} </h1>
        <p>ID PRONTUARIO: {prontuario.id}</p>
    </div>
  )}
}

export default Prontuario;