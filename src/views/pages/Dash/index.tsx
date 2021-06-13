import React, { useEffect, useState, useCallback } from 'react';
import {useParams, Link, useHistory} from "react-router-dom"
import api from "../../../service/api";
import {toast} from "react-toastify";



// import { Container } from './styles';

const Dash: React.FC = () => {

  const history= useHistory();
  let { id }  = useParams<{ id: string }>();
  const [resultadoApi, setResultadoApi] = useState<any>({});
  

  // console.log("0.0 the variable ",resultadoApi)
  // console.log("0.1 typeof ",typeof(resultadoApi))
  // console.log("0.0 the nome ",resultadoApi.nome)

  useEffect(
    () => {
    api.get("/pacientes/" + id)
    .then(res => setResultadoApi(res.data))
    .catch(console.error)
  },[id])


  // console.log("endereco e:" ,resultadoApi.endereco_paciente)

  let endereco =  resultadoApi.endereco_paciente
  if (typeof(endereco)==="undefined"){
    // console.log("endereco is undefined!")
    endereco = {}
  }

  const deleteCliente = useCallback(
    () => {
      api.delete(`clientes/${id}`).then(
        response => {
          toast.success("Cadastro deletado com sucesso", {
          onClose: () =>  history.push("/")})
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
    }, [history, id]
  );
  
if(!endereco){
  return (
    <>

      <div>
          <h1>Paciente: {resultadoApi.nome} </h1>
          <p>CPF: {resultadoApi.cpf}</p>
          <p>Tel: {resultadoApi.tel}</p>  <p>Celular: {resultadoApi.celular}</p>
          <p>Email: {resultadoApi.email}</p>
          <Link to={`${resultadoApi.id}/edit`} >Editar dados</Link>
      </div>

      <Link to={`/endereco/${resultadoApi.id}`} >PRONTUARIO</Link>

      <div>
        <h1>Endereço:</h1>

        <Link to={`/endereco/${resultadoApi.id}`} >Adicionar endereco</Link>
      </div>
      

      <br/>
      <button onClick={deleteCliente}>deletar paciente</button>
    </>
      
  );
} else {

  return (
    <>
    
      <div>
          <h1>Paciente: {resultadoApi.nome} </h1>
          <p>CPF: {resultadoApi.cpf}</p>
          <p>Tel: {resultadoApi.tel}</p>  <p>Celular: {resultadoApi.celular}</p>
          <p>Email: {resultadoApi.email}</p>
          <Link to={SignUp => `${resultadoApi.id}/edit`} >Editar dados</Link>
      </div>

      <button><Link to={`/prontuario/${resultadoApi.id}`} >PRONTUARIO</Link></button>

      <div>
        <h1>Endereço:</h1>
        <p>CEP: {endereco.cep}</p>
        <p>Logradouro: {endereco.logradouro}</p>  
        <p>Bairro: {endereco.bairro}</p>
        <p>Cidade: {endereco.cidade}, {endereco.uf}</p>

        <Link to={`/endereco/${resultadoApi.id}`} >Editar endereco</Link>
      </div>
      

      <br/>
      <button onClick={deleteCliente}>deletar paciente</button>
    </>
      
  );

}
  
}

export default Dash;