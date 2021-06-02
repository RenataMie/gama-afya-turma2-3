import React, { useEffect, useState, useCallback } from 'react';
import {useParams, Link, useHistory} from "react-router-dom"
import api from "../../../service/api";
import {toast} from "react-toastify";



// import { Container } from './styles';

const Dash: React.FC = () => {

  const history= useHistory();
  let { id }  = useParams<{ id: string }>();
  const [resultadoApi, setResultadoApi] = useState<any>({});
  

  console.log("0.0 the variable ",resultadoApi)
  console.log("0.1 typeof ",typeof(resultadoApi))
  console.log("0.0 the nome ",resultadoApi.nome)

  useEffect(
    () => {
    api.get("/clientes/" + id +"/enderecos")
    .then(res => setResultadoApi(res.data))
    .catch(console.error)
  },[id])


  console.log("endereco e:" ,resultadoApi.endereco)

  let endereco =  resultadoApi.endereco
  if (typeof(endereco)==="undefined"){
    console.log("endereco is undefined!")
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
  

  return (
    <>
    
      <div>
          <h1>Paciente: {resultadoApi.nome} </h1>
          <p>CPF: {resultadoApi.cpf}</p>
          <p>Tel: {resultadoApi.tel}</p>  <p>Celular: {resultadoApi.celular}</p>
          <p>Email: {resultadoApi.email}</p>
          <Link to={SignUp => `${resultadoApi.id}/edit`} >Editar dados</Link>
      </div>
      <div>
        <h1>Endereco:</h1>
        <p>{endereco.logradouro}, {endereco.numero}</p>
        <p>Bairro: {endereco.bairro}</p>
        <p>Cep: {endereco.cep}</p>
        <p>{endereco.cidade}, {endereco.uf}</p>
        <a href="/id/edit">Editar endereco</a>
      </div>

      <br/>
      <button onClick={deleteCliente}>deletar paciente</button>
    </>
      
  );
}

export default Dash;