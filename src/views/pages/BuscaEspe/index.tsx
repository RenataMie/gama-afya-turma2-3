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
        api.get("/especialista")
          .then(res => {
            setApiData(res.data)
            console.log(res.data)
          })
          .catch(console.error)
      }
    }

  return (

    <div>
      <div>
          <form action="" onSubmit={getClientes}>
            <label htmlFor="">Procurar por nome do especialista :</label><br/>
            <input type="text" name="nome" value={search} onChange={e => setSearch(e.target.value)}/>
          </form>
      </div>

    <div>
      {!search? null :
      
        <div>
           {apiData.filter((data: {nome: string}) => {
                  return (data.nome).toUpperCase().includes(search.toUpperCase());
                }).map ((data : {
                  profissao_especialista: any;
                  id: React.Key; 
                  nome: string;
                  tel: null|string; 
                  celular: string;
                  email:string;
                  profissao:string
                }) => {
                  return(
                    <div key={data.id}>
                        <Link to={`${data.id}`} >Nome : {data.nome}</Link>
                        <p>Profissao: {data.profissao_especialista.profissao}</p> 
                        <p>Tel/ Celular: {data.tel || data.celular}  </p>
                        
                        
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