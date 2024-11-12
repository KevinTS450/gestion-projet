import React from "react";
import { useState, useEffect } from "react";
import { KeyOutlined, RedEnvelopeOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button } from "antd";
import { AuthService } from "../../service/Auth.service";
import { Message } from "../../../utils/toast.service";
import { serviceConfig } from "../../../../config/Service.config";

function Activation(props) {

    const [code, setCode] = useState(0)
    const [stepDone, setStepDone] = useState(false)

    const truncateEmail = (email, maxLength = 30) => {
        if (email.length > maxLength) {
            return email.substring(0, maxLength - 3).toLowerCase() + '...';
        }
        return email.toLowerCase();
    };
    const getAttr = (e) => {

        const name = e.target.name
        const value = parseInt(e.target.value)

        console.log(value)
        if (name == 'code') {

            setCode(value)
        }

    }

    const [formErrors, setFormErrors] = useState({
        code: 0
    })

    const validationErros = (code) => {

        let isValid = true
        const error = {}

        if (!code) {

            isValid = false
            error.code = "veuillez saisir le code"

        }

        return isValid ? null : error



    }

    const manageCode = async (type) => {

        if (type == 'check') {

            const validateErros = validationErros(code)

            if (validateErros) {

                setFormErrors(validateErros)
                return

            }

            const data = {
                code: code,
                user_id: props.account.id,
                type: "with_code"
            }
            const check = await AuthService.checkCode(data)

            if (check.data.status == 'success') {

                Message('success', 'topRight', "votre compte a etait activer")
                setStepDone(true)
                serviceConfig.clearArgs()

                if (!props.message) {

                    props.stepFinal(true)

                } else {

                    const dataToSend = {
                      
                        toLogin:true
                    }
                    props.toLogin(dataToSend)
                }

            } else if (check.data.status == 'error') {

                Message('error', 'topRight', "les code ne sont pas identique")

            }
        }


        else if (type == 'new') {

            const data = {
         
                user_id: props.account.id,
                type: "resend_code",
                email: props.account.email
         
            }

            const check = await AuthService.checkCode(data)

            if (check.data.message == 'code envoyé') {
                Message('success', 'topRight', check.data.message)
            }
        }

   }

    return (
        <>


            <div className="bg-white-500 p-20 rounded-lg shadow-lg max-w-md mx-auto mt-10">
                <div className="flex flex-col justify-center gap-2">
                    <h2 className="text-2xl font-bold text-black mb-6 text-center">Activation du compte</h2>
                    {props.message && (<span className="text-black w-[400px]  text-red-500"> Vous devez activer le compte avant le login </span>)}
                    <div className="flex flex-col justify-center items-center gap-2">

                        <span className="text-black"> veuillez saisir le vode dans : </span>
                        <span className="hover:underline text-gray-400 cursor-pointer"><RedEnvelopeOutlined /> {truncateEmail(props.account.email)}</span>

                    </div>


                </div>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="code" className="block text-white font-medium">Code d'activation </label>
                        <Input type="number" onChange={getAttr} addonBefore={<KeyOutlined />} placeholder="Votre code" name="code" />

                        
                    </div>

                    <div className="flex flex-col justify-center" >
                        <span onClick={() => manageCode('new')} className="text-black w-[400px] hover:underline  cursor-pointer ml-10"><LockOutlined /> renvoyer un nouveau code </span>


                        <Button onClick={() => manageCode('check')} type="primary" shape="round" className="mt-5" size='large'>
                            Activer votre compte
                        </Button>

                    </div>

                </form>
            </div>
        </>
    )
}


export default Activation;