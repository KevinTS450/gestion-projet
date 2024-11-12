
import { serviceConfig } from "../../../config/Service.config"

const createProject = async (data ,id=null) => {

    try {
        const params = {id}
        const uri = serviceConfig.API_URL + "/project"
        const res = await serviceConfig.doPost(uri, data ,{} ,params)
        return res

    } catch (erros) {
        console.error(erros)
    }
}

const listProject = async (data) => {

    try {
        const uri = serviceConfig.API_URL + "/project"
        const res = await serviceConfig.doGet(uri, data)
        return res

    } catch (erros) {
        console.error(erros)
    }
}

const deleteProject = async (params, id) => {

    try {
        const parametre = { params, id }
        const uri = serviceConfig.API_URL + "/project"

        const res = await serviceConfig.doDelete(uri, parametre)
        return res;

    } catch (error) {
        console.error(error)
    }
}

const getProject = async (id) => {

    try {
        const params = { id }
        const uri = serviceConfig.API_URL + "/project/getProject"
        const res = await serviceConfig.doGet(uri, params)
        return res

    } catch (error) {
        console.error(error)
    }

}
export const projectService = {
    createProject,
    listProject,
    deleteProject ,
    getProject
}




