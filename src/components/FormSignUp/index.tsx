import React, { FormEvent, useCallback, useState, useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../service/api";

interface IUserRegister{
  cpf: string
  nome: string,
  tel: string,
  celular: string,
  email: string,
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
    api.get("/clientes")
    .then(res => 
      {const dt= res.data.find(((data:{ id: string })  => JSON.stringify(data.id) === id))
      return (setFormDataContent(dt))
      
      }
      )
  .catch(console.error)}
  },[id])
  

  const postCliente = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)

      api.post("clientes", formDataContent).then(
        response => {
          toast.success("Primeira parte ok, continue com o cadastro", {
            onClose: () =>  history.push("/endereco")
          })
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
      .finally(() => setIsLoad(false))
    }, [formDataContent, history]
  );

  const updateCliente = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)

      api.put(`clientes/${id}`, formDataContent).then(
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
        :  ( <form onSubmit={postCliente}>
        <input type="text" name="name" placeholder="Insira seu nome" onChange={e => setFormDataContent({...formDataContent, nome: e.target.value})}/>
        <input type="text" name="cpf" placeholder="informe seu cpf" onChange={e => setFormDataContent({...formDataContent, cpf: e.target.value})}/>
        <input type="text" name="tel" placeholder="telefone" onChange={e => setFormDataContent({...formDataContent, tel: e.target.value})}/>
        <input type="text" name="celular" placeholder="celular" onChange={e => setFormDataContent({...formDataContent, celular: e.target.value})}/>
        <input type="text" name="email" placeholder="email" onChange={e => setFormDataContent({...formDataContent, email: e.target.value})}/>
        <input type="submit" value="continuar"/>
      </form>
      )}
      </div>
  )} else {
    return (
      <div>
        
      {isLoad ?
       (<p>Carregando</p>)
      :  ( <form onSubmit={updateCliente}>
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