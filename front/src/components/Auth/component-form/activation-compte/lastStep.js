import React from "react";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LastStep() {
   
    let navigate = useNavigate()

    const  navigateToLogin = () => {
      navigate('/login')
  }
    return (
        <>
            <div className="bg-white-500 p-20 rounded-lg shadow-lg max-w-md mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-500 mb-6 text-center">Compte activer</h2>
                  <span onClick={()=>navigateToLogin()} className="justify-center items-center text-black cursor pointer hover:underline">Se connecter</span>
            </div>
        </>
    );
}

export default LastStep 