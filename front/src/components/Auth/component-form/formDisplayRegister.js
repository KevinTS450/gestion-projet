import React, { useState, useEffect } from "react";
import Activation from "./activation-compte/Activation.js";
import CreationCompte from "./creation-compte/creation-compte.js";
import { serviceConfig } from "../../../config/Service.config.js";
import LastStep from "./activation-compte/lastStep.js";
export default function FormsDisplayRegister() {



 
 
 const [email, setEmail] = useState("");
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [final , setFinal]=useState(false)
  const [userData , setUserData]=useState()
  useEffect(() => {
 
   const data = JSON.parse(serviceConfig.getCreationStepArgs()) 
    if (data) {
      console.log(data)
      const user = JSON.parse(data.user)
      setStep1(data.step_1);
      setStep2(data.step_2);
      setEmail(data.email);
      setUserData(user)
   
    }
  }, [step1 ,step2 ,email]);



  const checkData = (data) => {
    if (data) {
    
      setStep1(false);
      setStep2(data.stepDone);
      setEmail(data.email);
      setUserData(data.user_data)
      serviceConfig.setCreationAccountStepArgs(false, data.stepDone, data.user_data);

    }
  };

  const changeStep= () => {
    serviceConfig.clearArgs()
    setStep1(true)
    setStep2(false)
  }

  const finalStep = (data) => {
   
    setStep1(false)
    setStep2(false)
    setFinal(data)
  
  }

  const step_1 = () => {
   
    return <CreationCompte account_data={checkData} />;
  
  };

  const step_2 = () => {
  
  
  return ( <>
        <Activation stepFinal={finalStep} account={userData} />
        <div className="flex flex-col justify-center gap-2">

        <span onClick={()=>changeStep()} className="flex flex-row gap-5 font-medium text-gray-800 cursor-pointer hover:underline max-w-md mx-auto mt-10">etapte precedente</span> 
        </div>
        

    </> )
    
  };



  if (step1) {
    return step_1();
  }

  if (step2) {
    return step_2();
  }

  if(final) {

    return <LastStep/>
  }

}
