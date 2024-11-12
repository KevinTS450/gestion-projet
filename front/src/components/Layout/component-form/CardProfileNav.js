import { Card, Divider } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RightOutlined, UserOutlined ,SettingOutlined ,LogoutOutlined } from '@ant-design/icons';

function CardProfileNav(props) {

    let navigate = useNavigate()
    const toProfile = () => {

        setTimeout(() => {
            navigate('/profile');
        }, 500);

    }

    const logOut = () => {
        props.logOut()
    }

    const cardTitle = () => {
        return (<>
            <div className="flex items-center p-3 justify-between">
            <div className="flex items-center justify-center w-full h-7 bg-gray-500 rounded-full text-white font-bold p-3">
            {props ? props.data.users.pseudo : null}
                </div>
                 <div className="flex flex-col p-5 w-full">
                 <span onClick={() => toProfile()} className="ml-3 cursor-pointer hover:underline">  {props ? props.data.users.email : null}</span>
                  {props.data.roles && props.data.roles.map((items , index) => (
                 <span key={index} 
                 className="text-gray-500 ml-3">{items.value? items.value : "Utilisateur"}
                    {index < props.data.roles.length - 1 && " / "}
                    </span>
                 ))}
                 </div>
            </div>
        </>)
    }

    return (
        <>
            <Card

                onMouseLeave={props.onMouseLeave}
                title={cardTitle()}
                bordered={false}
                className={props.style}>
                <div className="flex flex-col gap-5">

                    <div className="flex flex-row justify-between gap-2">
                        <span className="font-semibold text-gray-500 cursor-pointer">
                            <div className="flex flex-row items-center gap-2">
                                <UserOutlined />
                                Profile 
                            </div>
                        </span>
                        <span className="cursor-pointer"><RightOutlined /></span>
                    </div>

                    <div className="flex flex-row justify-between gap-2">

                    <span className="font-semibold text-gray-500 cursor-pointer">
                            <div className="flex flex-row items-center gap-2">
                                <SettingOutlined />
                                Paramétre 
                            </div>
                        </span>
                        <span className="cursor-pointer"><RightOutlined /></span>  
                        </div>

                    <div className="flex flex-row justify-between gap-2">

                    <span className="font-semibold text-gray-500 cursor-pointer">
                            <div onClick={()=>logOut()} className="flex flex-row items-center gap-2">
                              <span  className="cursor-pointer"><LogoutOutlined /></span>  
                                Deconnexion 
                            </div>
                        </span>
                        <span className="cursor-pointer"><RightOutlined /></span>  
                        </div>
                </div>


            </Card>
        </>
    )


}

export default CardProfileNav