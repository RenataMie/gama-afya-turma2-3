import React from 'react';
import {Route, Redirect} from "react-router-dom";
import jwt from "jsonwebtoken";


const PrivateRoutes: any = ({component: Component, path: Path, ...rest}: any) => {
    const isLoggedIn: string | null = localStorage.getItem("@tokenDesafioAfyaApp")
    
    const isSectionActive: any = () => {
      if (isLoggedIn === undefined || null){
        return false
      } else {
        const onlyToken: any = isLoggedIn?.split(" ")[1]
        const tokenPayLoad: any = jwt.decode(onlyToken); 

        const expSeconds = tokenPayLoad.exp;
         const timeNow = Date.now() / 1000; 

         return timeNow > expSeconds ? false : true

      }
    }
    
  
    return (
    <Route {...rest} render={props => (
        isSectionActive() ? <Component {...props} /> : <Redirect to="/login" />
    )} />

  );
}

export default PrivateRoutes;