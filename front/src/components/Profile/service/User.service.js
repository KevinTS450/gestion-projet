import { serviceConfig } from "../../../config/Service.config";

export const UserService = {
    getUsers,
    attachDocs,
    showDocs ,
    deleteDocs

}



async function getUsers() {

    try {
        const headers = serviceConfig.getAuthHeadersUsers()

        const uri = serviceConfig.API_URL + "/users"
        const res = serviceConfig.doGet(uri, {}, headers)

        return res


    } catch (error) {

        console.error(error)
    }
}

async function attachDocs(data) {

    try {

        const uri = serviceConfig.API_URL + "/users/uploadDocs"
        const res = serviceConfig.doPost(uri, data)

        return res


    } catch (error) {

        console.error(error)
    }
}

async function showDocs(fileName) {

    try {
        const params = { fileName }
        const uri = serviceConfig.API_URL + "/users/showDocs"
        const res = serviceConfig.doGet(uri, params, {}, 'blob')

      

        return res; 

    } catch (error) {

        console.error(error)
    }
}

async function deleteDocs (id) {

    
    try {
        const params = { id }
        const uri = serviceConfig.API_URL + "/users/deleteDocs"
        const res = serviceConfig.doDelete(uri, params)

      

        return res; 

    } catch (error) {

        console.error(error)
    }
}