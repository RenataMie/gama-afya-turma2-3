import React, { FormEvent, useCallback, useState } from 'react';
import {useHistory} from "react-router-dom";
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

  const[formDataContent, setFormDataContent]=useState<IUserRegister>({} as IUserRegister);
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)


      api.post("clientes", formDataContent).then(
        response => {
          toast.success("Primeira parte ok, continue o cadastro", {
            onClose: () =>  history.push("/endereco")
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
        <input type="text" name="cpf" placeholder="informe seu cpf" onChange={e => setFormDataContent({...formDataContent, cpf: e.target.value})}/>
        <input type="text" name="tel" placeholder="telefone" onChange={e => setFormDataContent({...formDataContent, tel: e.target.value})}/>
        <input type="text" name="celular" placeholder="celular" onChange={e => setFormDataContent({...formDataContent, celular: e.target.value})}/>
        <input type="text" name="email" placeholder="email" onChange={e => setFormDataContent({...formDataContent, email: e.target.value})}/>
        <input type="submit" value="criar conta"/>
      </form>
      )}
        
        
      </div>
  );
}

export default FormSignUp;