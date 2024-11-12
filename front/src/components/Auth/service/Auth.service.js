import { serviceConfig } from "../../../config/Service.config.js";

export const AuthService = {
    createUsers,
    Authentificate ,
    checkCode ,
    LogGout
}



async function createUsers(data) {
    try {

        const uri = serviceConfig.API_URL + "/users/create"
        const res = await serviceConfig.doPost(uri, data)
        return res

    } catch (error) {
        console.error(error)
    }
}

async function Authentificate(data) {

    try {
        const uri = serviceConfig.API_URL + "/auth"
        const res = await serviceConfig.doPost(uri,data)
        return res

    } catch(error) {
        console.error(error)
    }
}

async function checkCode (data) {

    try {
      
        const uri = serviceConfig.API_URL + "/users/activation"
        const res = await serviceConfig.doPost(uri,data)
        console.log(res)
        return res

    }catch(error) {
        console.error(error)
    }
}

async function LogGout() {

    try {
        const token = serviceConfig.getToken()
        const headers = serviceConfig.getAuthHeadersUsers()

        const uri = serviceConfig.API_URL + "/auth/logout"
        const res = await serviceConfig.doPost(uri ,{} ,headers)

        if(res) {
       
            serviceConfig.clearToken()
       
        }
        return res

    } catch(error) {
        console.error(error)
    }
}



