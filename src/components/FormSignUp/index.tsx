import React, { FormEvent, useCallback, useState } from 'react';
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../service/api";

interface IUserRegister{
  cpf: string
  nome: string,
  login: string,
  senha: string,
  
}

// import { Container } from './styles';

const FormSignUp: React.FC = () => {

  const history= useHistory();

  const[formDataContent, setFormDataContent]=useState<IUserRegister>({} as IUserRegister);
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)


      api.post("usuarios", formDataContent).then(
        response => {
          toast.success("Cadastro realizado com sucesso! Voce esta sendo redirecionado pro login", {
            onClose: () =>  history.push("/login")
          })
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
      .finally(() => setIsLoad(false))

      // console.log(JSON.stringify(formDataContent));
      // console.log(formDataContent.senha)

      // setTimeout(() => {
      //   setIsLoad(false)
      // },1000);

    }, [formDataContent, history]
  );

  return (
      <div>
        {isLoad ?
         (<p>Carregando</p>)
        :  ( <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Insira seu nome" onChange={e => setFormDataContent({...formDataContent, nome: e.target.value})}/>
        <input type="text" name="username" placeholder="nome do usuario" onChange={e => setFormDataContent({...formDataContent, login: e.target.value})}/>
        <input type="text" name="cpf" placeholder="informe seu cpf" onChange={e => setFormDataContent({...formDataContent, cpf: e.target.value})}/>
        <input type="password" name="password" placeholder="senha" onChange={e => setFormDataContent({...formDataContent, senha: e.target.value})}/>
        <input type="submit" value="criar conta"/>
      </form>
      )}
        
        
      </div>
  );
}

export default FormSignUp;