import React, { FormEvent, useState } from 'react';
import {Link} from "react-router-dom";
import api from "../../../service/api";


// import { Container } from './styles';



const Busca: React.FC = () => {

    const [search, setSearch] = useState<string>("");
    const [apiData, setApiData] = useState<any>([]);

    function getClientes(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

    if (!search){
        console.log("nenhuma busca")
        return
    } else {
    api.get("/clientes")
    .then(res => {
        if ( res.status === 200) {
          
          setApiData(res.data)
          console.log(apiData)
        }
      })
    .catch(console.error)
  }
}
  
  // console.log("Maria Silva".toUpperCase().includes("Maria".toUpperCase()))
  // console.log("Maria Silva".toUpperCase().includes("sil".toUpperCase()))


  return (

    <div>
      <div>
          <form action="" onSubmit={getClientes}>
            <label htmlFor="">Procurar por nome :</label><br/>
          <input type="text" name="nome" value={search} onChange={e => setSearch(e.target.value)}/>
          </form>
      </div>

    <div>
      {!search? null :
      
        <div>
           {apiData.filter((data: {nome: string}) => {
                  return (data.nome).toUpperCase().includes(search.toUpperCase());
                }).map ((data : {
                  id: React.Key; 
                  nome: string;
                  tel: null|string; 
                  celular: string;
                  email:string
                }) => {
                  return(
                    <div key={data.id}>
                      <Link to={Dash => `${data.id}`} >Nome : {data.nome}</Link>
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

export default Busca;