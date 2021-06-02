import React, { FormEvent, useCallback, useState } from 'react';
import Lottie from 'react-lottie';
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../service/api";


import animationData from "../../assets/animation/an3.json";

import {FormContent} from "./style";

interface IUserLogin{
  
  usuario: string,
  senha: string,
  
}

// import { Container } from './styles';

const FormLogin: React.FC = () => {

  const history= useHistory();

  const[formDataContent, setFormDataContent]=useState<IUserLogin>({} as IUserLogin);
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)


      api.post("login", formDataContent).then(
        response => {
            localStorage.setItem("@tokenAfyaApp", response.data.token)
            toast.success("Ok! Voce esta sendo redirecionado pro login", {
            onClose: () =>  history.push("/dash")
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

    const animationContent = {
        loop: true, 
        autoplay: true,
        animationData: animationData
    }

  return (
      <FormContent>
         
        {isLoad ?
         (
            <Lottie
            options={animationContent}
            width={200}
            height={200}
            />
            )
        :  ( <form onSubmit={handleSubmit}>
       
        <input type="text" name="username" placeholder="nome do usuario" onChange={e => setFormDataContent({...formDataContent, usuario: e.target.value})}/>
        <input type="password" name="password" placeholder="senha" onChange={e => setFormDataContent({...formDataContent, senha: e.target.value})}/>
        <input type="submit" value="Entrar"/>
      </form>
      )}
        
        
      </FormContent>
  );
}

export default FormLogin;