import React from "react";
import { useState, useEffect } from "react";
import { serviceConfig } from "../../../config/Service.config";
import Login from "./login/login";
import Activation from "./activation-compte/Activation";
import { useNavigate } from "react-router-dom";


export default function FormsDisplayLogin() {

  const [accountDesactivate, setAccountDesactivate] = useState(false)
  const [userData, setUserData] = useState()
  let navigate = useNavigate()

  const getData = (data) => {

    if (data.account_desactivate) {

      setAccountDesactivate(data.account_desactivate)
      setUserData(data.user_data)
    }

    if(data.authorization) {
      
     
      serviceConfig.setToken(data.token)
      serviceConfig.redirectTo('/profile')

    }

   

    if(data.toLogin) {
      setAccountDesactivate(false)
    }


  }
  if (!accountDesactivate) {
    
    return <Login accountStatus={getData}  />
 
  } else {

    return <Activation toLogin={getData} message={true} account={userData} />
  }
}

