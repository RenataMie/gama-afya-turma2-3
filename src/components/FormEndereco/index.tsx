
import React, { FormEvent, useCallback, useState, useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../service/api";


interface IUserAdress{
  cep: number|string,
  logradouro: string,
  numero: number|string,
  bairro: string,
  cidade: string,
  uf: string
}

interface Pacprops{
  cpf: string
  nome: string,
  tel: string,
  celular: string,
  data_nasc: string,
  email: string,
  tipo_sangue: string,
  id_endereco: number|string
}


const FormEndereco: React.FC = () => {

  const history= useHistory();
  let { id }  = useParams<{ id: string }>();

  const[formDataContent, setFormDataContent]=useState<IUserAdress>({} as IUserAdress);
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [pacienteProp, setPacienteProp]=useState<Pacprops>({} as Pacprops);
  const [endId, setEndId] = useState<number>()
  

  useEffect(
    () => {
    api.get("/pacientes/" + id)
    .then(res => setPacienteProp(res.data))
    .catch(console.error)
  },[id])


  const handleSubmit = useCallback(

      (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoad(true)
      
           api.post("/enderecos", formDataContent).then(
             response => {
              setEndId(response.data.id)
              console.log(endId)
              const pacienteAllData = {...pacienteProp, id_endereco: response.data.id}
              console.log(pacienteAllData)

           api.put("/pacientes/" + id, pacienteAllData)
              .then(() => {
                     toast.success("Endereco atualizado com sucesso!", {
                     onClose: () =>  history.push("/")
                     })})
               .catch(() => toast.error("Ops, algo deu errado :("))
               .finally(() => setIsLoad(false))
             })     
    }, [endId, formDataContent, history, pacienteProp, id]
  );

  if(pacienteProp) {
  return (
      <div>
        {isLoad ?
         (<p>Carregando</p>)
        :  ( 
        <div>
        <form onSubmit={handleSubmit}>
        <input type="number" name="cep" placeholder="cep" onChange={e => setFormDataContent({...formDataContent, cep: e.target.value})}/>
        <input type="text" name="logradouro" placeholder="logradouro" onChange={e => setFormDataContent({...formDataContent, logradouro: e.target.value})}/>
        <input type="number" name="numero" placeholder="numero" onChange={e => setFormDataContent({...formDataContent, numero: e.target.value})}/>
        <input type="text" name="bairro" placeholder="bairro" onChange={e => setFormDataContent({...formDataContent, bairro: e.target.value})}/>
        <input type="text" name="cidade" placeholder="cidade" onChange={e => setFormDataContent({...formDataContent, cidade: e.target.value})}/>
        <input type="text" name="cidade" placeholder="uf" onChange={e => setFormDataContent({...formDataContent, uf: e.target.value})}/>
        <input type="submit" value="criar conta" />
        </form>
      </div>
      )}
      </div>
  );
  } else {
       return  <h1>epa</h1>
  }

}

export default FormEndereco;