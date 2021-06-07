import React, { FormEvent, useCallback, useState, useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../service/api";

interface IEspRegister{
  registro: string
  nome: string,
  tel: string,
  celular: string,
  email: string,
  id_profissao: number|string
}

interface IProfRegister {
  profissao: string
}
// import { Container } from './styles';

const FormEspe: React.FC = () => {

  const history= useHistory();
  let { id }  = useParams<{ id: string }>();

  const[formDataContent, setFormDataContent]=useState<IEspRegister>({} as IEspRegister);
  const[formProfissao, setFormProfissao] = useState<IProfRegister>({} as IProfRegister);
  const [profissaoId, setProfissaoId] = useState<number>()
  const [isLoad, setIsLoad] = useState<boolean>(false)

  useEffect(() => {
    if(!id){
      console.log("nenhum id encontrado")
      setFormDataContent({} as IEspRegister)
      setFormProfissao({} as IProfRegister)
    } else {
      api.get("/especialistas")
        .then(res => 
          {const dt= res.data.find(((data:{ id: string })  => JSON.stringify(data.id) === id))
            return (setFormDataContent(dt))}
          )
        .catch(console.error)}
  },[id])
  

  const postEspecialista= useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)

      api.post("profissoes", formProfissao).then(
        response => {
          setProfissaoId(response.data.id)
              console.log(profissaoId)
              const EspeciAllData = {...formDataContent, id_profissao: response.data.id}
              console.log(EspeciAllData)



          api.post("especialista", EspeciAllData)
        .then(() => {
          toast.success("Cadastro salvo com sucesso", {
            onClose: () =>  history.push("/")
          })
        }
      ).catch(e => toast.error("Ops, algo deu errado :("))
      .finally(() => setIsLoad(false))
        })
    }, [formDataContent, history, formProfissao, profissaoId]
  );

  const updateEspecialista = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)

      api.put(`especialistas/${id}`, formDataContent).then(
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
        :  ( <form onSubmit={postEspecialista} >
        <input type="text" name="registro" placeholder="informe seu registro" onChange={e => setFormDataContent({...formDataContent, registro: e.target.value})}/>   
        <input type="text" name="nome" placeholder="Insira seu nome" onChange={e => setFormDataContent({...formDataContent, nome: e.target.value})}/>
        <input type="text" name="tel" placeholder="telefone" onChange={e => setFormDataContent({...formDataContent, tel: e.target.value})}/>
        <input type="text" name="celular" placeholder="celular" onChange={e => setFormDataContent({...formDataContent, celular: e.target.value})}/>
        <input type="text" name="email" placeholder="email" onChange={e => setFormDataContent({...formDataContent, email: e.target.value})}/>
        <input type="text" name="profissao" placeholder="profissao" onChange={e => setFormProfissao({...formProfissao, profissao: e.target.value})}/>
        <input type="submit" value="salvar"/>
      </form>
      )}
      </div>

  )} else {
    
    return (
      <div>
        
      {isLoad ?
       (<p>Carregando</p>)
      :  ( <form onSubmit={updateEspecialista}>
       <input type="text" name="registro" placeholder="informe seu registro" onChange={e => setFormDataContent({...formDataContent, registro: e.target.value})}/>   
        <input type="text" name="nome" placeholder="Insira seu nome" onChange={e => setFormDataContent({...formDataContent, nome: e.target.value})}/>
        <input type="text" name="tel" placeholder="telefone" onChange={e => setFormDataContent({...formDataContent, tel: e.target.value})}/>
        <input type="text" name="celular" placeholder="celular" onChange={e => setFormDataContent({...formDataContent, celular: e.target.value})}/>
        <input type="text" name="email" placeholder="email" onChange={e => setFormDataContent({...formDataContent, email: e.target.value})}/>
        <input type="text" name="profissao" placeholder="profissao" onChange={e => setFormProfissao({...formProfissao, profissao: e.target.value})}/>
        <input type="submit" value="salvar"/>
    </form>
    )}
    </div>
    )
  }
  
}

export default FormEspe;