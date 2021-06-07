import React, { FormEvent, useState } from 'react';
import {Link} from "react-router-dom";
import api from "../../../service/api";

// import { Container } from './styles';

const BuscaEsp: React.FC = () => {

    const [search, setSearch] = useState<string>("");
    const [apiData, setApiData] = useState<any>([]);

    function getClientes(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

    if (!search){
        console.log("nenhuma busca")
        return
    } else {
        api.get("/profissoes")
          .then(res => {
            setApiData(res.data)
            console.log(apiData)
          })
          .catch(console.error)
      }
    }

    let especialista =  apiData.especialistas;
            if (typeof(especialista)==="undefined"){
                // console.log("endereco is undefined!")
            especialista = []
            }
    console.log(especialista)


  return (

    <div>
      <div>
          <form action="" onSubmit={getClientes}>
            <label htmlFor="">Procurar por especialidade :</label><br/>
            <input type="text" name="nome" value={search} onChange={e => setSearch(e.target.value)}/>
          </form>
      </div>

    <div>
      {!search? null :
      
        <div>
           {especialista.filter((data: {profissao: string}) => {
                  return (data.profissao).toUpperCase().includes(search.toUpperCase());
                }).map ((data : {
                 especialistas: any;
                  id: React.Key; 
                  nome: string;
                  tel: null|string; 
                  celular: string;
                  email:string;
                  profissao:string
                }) => {
                  return(
                    <div key={data.especialistas[0].id}>
                        <Link to={`${data.id}`} >Nome : {data.especialistas[0].nome}</Link>
                        {/* <p>Profissao: {profissao.profissao}</p> */}
                        <p>Tel/ Celular: {data.tel || data.celular}  </p>
                        <p> Email: {data.email}</p><br/>
                    </div>
                )
                })
           }
        
        </div>
    }
    </div>
    </div>
      
  );
}

export default BuscaEsp;