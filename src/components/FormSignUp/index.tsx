import React, { FormEvent, useCallback, useState, useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../service/api";

interface IUserRegister{
  cpf: string
  nome: string,
  tel: string,
  celular: string,
  data_nasc: string,
  email: string,
  tipo_sangue: string
}

// import { Container } from './styles';

const FormSignUp: React.FC = () => {

  const history= useHistory();
  let { id }  = useParams<{ id: string }>();

  const[formDataContent, setFormDataContent]=useState<IUserRegister>({} as IUserRegister);
  const [isLoad, setIsLoad] = useState<boolean>(false)

  useEffect(() => {
    if(!id){
      console.log("nenhum id encontrado")
      setFormDataContent({} as IUserRegister)
    } else {
      api.get("/pacientes")
        .then(res => 
          {const dt= res.data.find(((data:{ id: string })  => JSON.stringify(data.id) === id))
            return (setFormDataContent(dt))}
          )
        .catch(console.error)}
  },[id])
  

  const postPaciente= useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)

      api.post("pacientes", formDataContent).then(
        response => {
          toast.success("Cadastro salvo com sucesso", {
            onClose: () =>  history.push("/")
          })
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
      .finally(() => setIsLoad(false))
    }, [formDataContent, history]
  );

  const updatePaciente = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)

      api.put(`pacientes/${id}`, formDataContent).then(
        response => {
          toast.success("Cadastro atualizado com sucesso", {
            onClose: () =>  history.push(`/${id}`)
          })
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
      .finally(() => setIsLoad(false))
    }, [formDataContent, history, id]
  );

  if(!id){
  return (
      <div>
        
        {isLoad ?
         (<p>Carregando</p>)
        :  ( <form onSubmit={postPaciente} >
        <input type="text" name="name" placeholder="Insira seu nome" onChange={e => setFormDataContent({...formDataContent, nome: e.target.value})}/>
        <input type="text" name="cpf" placeholder="informe seu cpf" onChange={e => setFormDataContent({...formDataContent, cpf: e.target.value})}/>
        <input type="text" name="tel" placeholder="telefone" onChange={e => setFormDataContent({...formDataContent, tel: e.target.value})}/>
        <input type="text" name="celular" placeholder="celular" onChange={e => setFormDataContent({...formDataContent, celular: e.target.value})}/>
        <input type="date" name="data_nasc" placeholder="data de nascimento" onChange={e => setFormDataContent({...formDataContent, data_nasc: e.target.value})}/>
        <input type="text" name="email" placeholder="email" onChange={e => setFormDataContent({...formDataContent, email: e.target.value})}/>
        <input type="text" name="tipo_sangue" placeholder="tipo sanguineo" onChange={e => setFormDataContent({...formDataContent, tipo_sangue: e.target.value})}/>
        <input type="submit" value="continuar"/>
      </form>
      )}
      </div>

  )} else {
    
    return (
      <div>
        
      {isLoad ?
       (<p>Carregando</p>)
      :  ( <form onSubmit={updatePaciente}>
      <input type="text" name="name" placeholder="Insira seu nome" value={formDataContent.nome} onChange={e => setFormDataContent({...formDataContent, nome: e.target.value})}/>
      <input type="text" name="cpf" placeholder="informe seu cpf" value={formDataContent.cpf} onChange={e => setFormDataContent({...formDataContent, cpf: e.target.value})}/>
      <input type="text" name="tel" placeholder="telefone" value={formDataContent.tel} onChange={e => setFormDataContent({...formDataContent, tel: e.target.value})}/>
      <input type="text" name="celular" placeholder="celular" value={formDataContent.celular} onChange={e => setFormDataContent({...formDataContent, celular: e.target.value})}/>
      <input type="text" name="email" placeholder="email" value={formDataContent.email} onChange={e => setFormDataContent({...formDataContent, email: e.target.value})}/>
      <input type="submit" value="salvar"/>
    </form>
    )}
    </div>
    )
  }
  
}

export default FormSignUp;