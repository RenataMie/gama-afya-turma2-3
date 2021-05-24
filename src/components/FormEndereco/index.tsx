import React, { FormEvent, useCallback, useState } from 'react';
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../service/api";

interface IUserAdress{
  cep: number|string,
  logradouro: string,
  numero: number|string,
  bairro: string,
  cidade: string,
  uf: string,

}

// import { Container } from './styles';

const FormEndereco: React.FC = () => {

  const history= useHistory();

  const[formDataContent, setFormDataContent]=useState<IUserAdress>({} as IUserAdress);
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)


      api.post("/clientes/:cliente_id/enderecos", formDataContent).then(
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
        <input type="number" name="cep" placeholder="cep" onChange={e => setFormDataContent({...formDataContent, cep: e.target.value})}/>
        <input type="text" name="logradouro" placeholder="logradouro" onChange={e => setFormDataContent({...formDataContent, logradouro: e.target.value})}/>
        <input type="number" name="numero" placeholder="numero" onChange={e => setFormDataContent({...formDataContent, numero: e.target.value})}/>
        <input type="text" name="bairro" placeholder="bairro" onChange={e => setFormDataContent({...formDataContent, bairro: e.target.value})}/>
        <input type="text" name="cidade" placeholder="cidade" onChange={e => setFormDataContent({...formDataContent, cidade: e.target.value})}/>
        <input type="text" name="cidade" placeholder="uf" onChange={e => setFormDataContent({...formDataContent, uf: e.target.value})}/>
        <input type="submit" value="criar conta"/>
      </form>
      )}
        
        
      </div>
  );
}

export default FormEndereco;