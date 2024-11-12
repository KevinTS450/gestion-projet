import React from "react";
import { useState ,useEffect } from "react";
import { FolderFilled ,CalendarFilled ,AimOutlined ,InfoCircleFilled} from '@ant-design/icons';

import { serviceConfig } from "../../../../config/Service.config";




function DetailsProject (props) {


    return (
    <>
    
    <div className="flex flex-col justify-start p-5 w-full h-full">
        
        <span className="font-semibold text-2xl"><FolderFilled/> {props.project ? props.project.nom : null }</span>
       <div className="flex flex-col gap-5 mt-10">
           <span className="text-gray-500"><AimOutlined/> Objectif : {props.project ? props.project.objectifs : null}</span>
           <span className="text-gray-500"><CalendarFilled/> Date de debut : {props.project ? serviceConfig.convertDate(props.project.date_de_debut) : null}</span>
           <span className="text-gray-500"> <CalendarFilled/> Date de fin : {props.project ? serviceConfig.convertDate(props.project.date_de_fin_prevue) : null}</span>

           <div className="text-gray-500 overflow-auto max-h-full w-3/4">
        <p><InfoCircleFilled/> Description : {props.project ? props.project.description : 'Aucune description disponible.'}</p>
    </div>
       </div>

    </div>

    </>)

}


export default DetailsProject;