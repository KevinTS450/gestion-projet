import React from "react";
import { useState, useEffect } from "react";
import { AuthService } from "../../service/Auth.service";
import { Input, Button } from 'antd';
import { RedEnvelopeOutlined, LockOutlined } from '@ant-design/icons';
import { Loader } from "../../../utils/spiner/spiner";
import { MessageAlert } from "../../../utils/Alert/alert";


export default function Login(props) {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [spiner, setSpiner] = useState(false)
  const [emailNotExist, setEmailNotExist] = useState("")
  const [unautorize, setunautorize] = useState("")

  const [formErrors, setFormErros] = useState({
    email: "",
    password: ""

  })

  const validationErros = (email, password) => {

    let isValid = true;
    const errors = {}

    if (!email) {

      isValid = false
      errors.email = "l'adresse email est obligatoire"

    }

    if (!password) {

      isValid = false
      errors.password = "le mot de passe est obligatoire"

    }

    return isValid ? false : errors



  }

  const dataSetting = () => {

    const data = {

      email: email,
      password: password

    }

    return data

  }


  async function handleLogin() {
    setSpiner(true);
    setEmailNotExist(false);

    const validationErrors = validationErros(email, password);
    if (validationErrors) {
      setFormErros(validationErrors);
      setSpiner(false);
      return;
    }

    const data = dataSetting();

    try {
      const auth = await AuthService.Authentificate(data);

      switch (auth.data.status) {
        case 'error':
          handleAuthError(auth.data.access, auth.data.user, auth.data.message);
          break;
        case 'Success':
          handleAuthSuccess(auth.data.authorization.token);
          break;
        default:
          setSpiner(false);
          console.warn('Statut inconnu :', auth.data.status);
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification :', error);
      setSpiner(false);
    }
  }

  function handleAuthError(access, user, message) {

    setSpiner(false);

    switch (access) {

      case "account_desactivate":
        props.accountStatus({
          account_desactivate: true,
          user_data: user,
        });
        break;

      case "Unauthorized":
        setunautorize(message);
        setEmailNotExist("")
        break;

      case "not_found":
        setEmailNotExist(message);
        setunautorize("");

        break;
      default:
        console.warn('Erreur non gérée :', message);
    }
  }

  function handleAuthSuccess(token) {
    setSpiner(false);
    props.accountStatus({
      authorization: true,
      token: token,
    });
  }


  const getAttr = (e) => {

    const name = e.target.name
    const value = e.target.value

    if (name == 'email') {

      setEmail(value)
    }

    if (name == 'password') {

      setPassword(value)
    }


  }


  return (
    <>



      <div className="bg-white-500 p-20 rounded-lg shadow-lg max-w-md mx-auto mt-10 w-full h-250">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Sign In</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white font-medium">Email</label>
            <Input type="email" value={email} onChange={getAttr} addonBefore={<RedEnvelopeOutlined />} placeholder="Votre email" name="email" />

            {formErrors && formErrors.email && !email && (<>
              <span className="text-red-500">{formErrors.email}</span>
            </>)}
          </div>
          <div>
            <label htmlFor="password" className="block text-white font-medium">Password</label>
            <Input type="password" value={password} onChange={getAttr} addonBefore={<LockOutlined />} placeholder="Votre mot de passe" name="password" />

            {formErrors && formErrors.password && !password && (<>
              <span className="text-red-500">{formErrors.password}</span>
            </>)}
          </div>
          <div className="flex flex-col justify-center items-center" >

            {emailNotExist != "" && (<MessageAlert type="error" message={emailNotExist} />
            )}
            {unautorize != "" && (<MessageAlert type="error" message={unautorize} />
            )}



            <Button disabled={spiner} onClick={() => handleLogin()} type="primary" shape="round" className="mt-5" size='large'>

              <div className={spiner ? 'flex flex-row gap-5' : ''}>
                <Loader spiner={spiner} />
                <span> {spiner ? "connexion..." : "Se conecter"} </span>
              </div>
            </Button>



          </div>

        </form>
      </div>

    </>
  )
}

