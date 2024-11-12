import { API_URL, serviceConfig } from "../../../config/Service.config"



async function ListUsers(data) {
    try {

        const uri = API_URL + "/users/ListUsers"
        const res = await serviceConfig.doGet(uri ,data)
        return res;

    } catch (error) {
        console.error(error)
    }
}

async function AllRoles() {
    try {

        const uri = API_URL + "/roles"
        const res = await serviceConfig.doGet(uri)
        return res;

    } catch (error) {
        console.error(error)
    }
}

async function assignRoles (data) {
    try {

        const uri = API_URL + "/roles/assignRoles"
        const res = await serviceConfig.doPost(uri ,data)
        return res;

    } catch (error) {
        console.error(error)
    }
}

async function getRolesOf(id_users) {
    try {

        const uri = API_URL + "/roles/assignRoles"
        const params = {id_users}
        const res = await serviceConfig.doGet(uri ,params)
        return res;

    } catch (error) {
        console.error(error)
    }
}

async function showProfileUsers (id_users)  {

    try {

        const uri = API_URL + "/users/showProfile"
        const params = {id_users}
        const res = await serviceConfig.doGet(uri ,params)
        return res;

    } catch (error) {
        console.error(error)
    }
}



export const UserMangeService = {
    ListUsers ,
    AllRoles ,
    assignRoles ,
    getRolesOf ,
    showProfileUsers
}