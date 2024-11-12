import React from "react";
import { useState, useEffect } from "react";
import { Input } from 'antd';
import { UserOutlined, RedEnvelopeOutlined, LockOutlined, CalendarOutlined } from '@ant-design/icons';
import { DatePicker, Space, Button, Select } from 'antd';

import { AuthService } from "../../service/Auth.service.js";
import { Message } from "../../../utils/toast.service.js";
import DraggerFile from "../../../utils/dragger/dragger.js";
export default function CreationCompte(props) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")



  const [password, setPassword] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("")

  const [messPasswordNotEquals, setMessPasswordNotEquals] = useState("")
  const [messPasswordMinLength, setmessPasswordMinLength] = useState("")

  const [confirm_pass, setConfirmPass] = useState("")
  const [date_naissance, setDateNaissance] = useState("")
  const [fileList, setFileList] = useState([])

  const options = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },

  ]

  const [formErros, setFormErros] = useState({
    name: "",
    email: "",
    password: "",
    date_naissance: "",
    gender: "",
    confirm_pass: ""
  })

  const onChange = (date, dateString) => {
    setDateNaissance(dateString)
  };
  const handleChange = (e) => {
    const value = e
    setGender(value)
  }


  const initForms = () => {

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPasswordValue("")
    setPasswordValue("")
    setConfirmPass("");
    setDateNaissance("");
    setGender("");

  }


  const getAttr = (e) => {
    const name = e.target.name

    if (name == 'name') {

      const value = e.target.value
      setName(value)

    }


    if (name == 'email') {

      const value = e.target.value
      setEmail(value)

    }

    if (name == 'confirm_password') {

      const value = e.target.value
      setConfirmPasswordValue(value)
      if (value !== password) {

        setMessPasswordNotEquals("Les mot de passe doivent etre identique")
      } else {

        setMessPasswordNotEquals("")
      }
      setConfirmPass(value)
    }

    if (name == 'password') {

      const value = e.target.value
      setPasswordValue(value)

      if (value.length >= 8) {

        setPassword(value)
        setmessPasswordMinLength("")

      } else {

        setmessPasswordMinLength("Le mot de passe doit etre egal a 8 caractére")

      }
    }


    if (name == 'date_naissance') {

      const value = e.target.value
      setDateNaissance(value)
    }

  }


  const validationForms = (name, email, password, confirm_pass, date_naissance, gender) => {

    let isValid = true
    let formErrors = {};


    if (!name) {

      formErrors.name = 'veuillez choisir le nom'
      isValid = false

    }

    if (!email) {

      formErrors.email = "veuillez choisir l'email"
      isValid = false

    }

    if (!confirm_pass) {

      formErrors.confirm_pass = "veuillez confirmer le mot de passe"

    }

    if (!password) {

      formErrors.password = "veuillez choisir le mot de passe"
      isValid = false

    }



    if (!date_naissance) {

      formErrors.date_naissance = "veuillez choisir la date de naissance"
      isValid = false

    }




    if (!gender) {

      formErrors.gender = "veuillez preciser le genre"
      isValid = false

    }

    return isValid ? false : formErrors;

  }



  const register = async () => {

    const validationErros = validationForms(name, email, password, confirm_pass, date_naissance, gender)

    if (validationErros) {

      setFormErros(validationErros)
      return

    } else {

      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('date_naissance', date_naissance);
      formData.append('gender', gender);
      
      fileList.forEach((file) => {
        formData.append('file[]', file); 
      });
      
     
  
      const res = await AuthService.createUsers(formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type
        },
      });
      if (res) {

        const data = {
          stepDone: true,
          email: res.user.email,
          user_data: res.user,
        }
        props.account_data(data)
        initForms()
        Message("success", "topRight", 'creation de compte', 'creation effectuer')


      }

    }


  }



  return (


    <div className="bg-white-500 p-20 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-500 mb-6 text-center">Register</h2>
      <form className="space-y-5">
        <div>

          <span className="block text-black font-low">Username</span>
          <Input value={name} onChange={getAttr} addonBefore={<UserOutlined />} placeholder="your name" name="name" />
          {formErros && formErros.name && !name && (<>
            <span className="text-red-500 w-200">{formErros.name}</span>
          </>)}
        </div>

        <div>
          <span htmlFor="email" className="block text-black font-low">Email</span>
          <Input value={email} onChange={getAttr} addonBefore={<RedEnvelopeOutlined />} placeholder="your email" name="email" />
          {formErros && formErros.email && !email && (<>
            <span className="text-red-500">{formErros.email}</span>
          </>)}
        </div>
        <div>
          <span htmlFor="password" className="block text-black font-low">Password</span>
          <Input value={passwordValue} onChange={getAttr} addonBefore={<LockOutlined />} type="password" placeholder="password" name="password" />

          <div className="flex flex-col gap-5">

            {formErros && formErros.password && !password && (<>
              <span className="text-red-500">{formErros.password}</span>
            </>)}
            {messPasswordMinLength != '' && (<>
              <span className="text-red-500">Le mot de passe doit depassé de 8 caractére</span>
            </>)}
          </div>
        </div>

        <div>
          <span htmlFor="password" className="block text-black font-low">Confirmation Password</span>
          <Input value={confirmPasswordValue} onChange={getAttr} addonBefore={<LockOutlined />} type="password" placeholder="confirm password" name="confirm_password" />
          {messPasswordNotEquals != '' && (<>
            <span className="text-red-500">Les mot de passe ne sont pas semblables</span>
          </>)}
          {formErros && formErros.confirm_pass && !confirm_pass && (<>
            <span className="text-red-500">{formErros.confirm_pass}</span>
          </>)}

        </div>

        <div>
          <span htmlFor="Date de naissance" className="block text-black font-low">Date de naissance</span>
          <DatePicker className="w-full" onChange={onChange} />
          {formErros && formErros.date_naissance && !date_naissance && (<>
            <span className="text-red-500">{formErros.date_naissance}</span>
          </>)}

        </div>


        <div >
          <span htmlFor="Gender" className="block text-black font-low"> Genre</span>
          <div className="flex flex-col gap-2">

            <Select
              value={gender}
              placeholder="genre"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={options}
            />
            {formErros && formErros.gender && !gender && (<>
              <span className="text-red-500">{formErros.gender}</span>
            </>)}

          </div>

        </div>


        <div>

          <span htmlFor="Gender" className="block text-black font-low"> Document de renseignement </span>
          <div className="flex flex-col gap-2">

            <DraggerFile fileList={fileList} setFileList={setFileList} />

          </div>

        </div>
        <div className="flex justify-center">
          <Button disabled={messPasswordNotEquals != '' || messPasswordMinLength != ''} onClick={() => register()} type="primary">Enregistrer</Button>

        </div>

      </form>
    </div>
  )
}










