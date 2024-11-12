import React from "react";
import { useState, useEffect } from "react";
import Project from "./Project/project";
import AddProject from "./Project/AddProject";
import { BreadcrumbCustom } from "../../utils/breadCrumb/breadCrumb";
import { projectService } from "../service/project.service";
import { LoaderPage } from "../../utils/spiner/spiner";
import { UserService } from "../../Profile/service/User.service";

function FormDisplayProject(props) {

    const [step1, setStep1] = useState(false)
    const [showMessage, setShowMessage] = useState("")
    const [showDeltedProject, setShowDeletedProject] = useState("")
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState([])
    const [currentPage ,setCurrentPage] = useState(1)

    const [totalPage, setTotalPage] = useState(0)
    const [spinFilter, setSpinFilter] = useState(false)
    const [idProject, setIdProject] = useState(0)
    const [searchData, setSearchData] = useState("")
    const [user, setUser] = useState(null)

    const getUsers = async () => {
        try {
            const res = await UserService.getUsers();
            console.log(res.data); 
            setUser(res.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    };
    useEffect(() => {
        getProject(null, '')
        getUsers()
    }, [idProject])

    const getChange = async (data) => {

        if (data.swicth_add) {
            setIdProject(null)
            setStep1(true)

        } else if (data.change) {

            setStep1(false)
            setShowMessage(data)
            await getProject(currentPage)
        }
        else if (data.refresh) {

            if (data.show_delete_message) {

                setShowMessage(data)
                await getProject()

            }

            if (data.show_restaure_message) {

                setShowMessage(data)
                await getProject()

            }

            if (data.filter) {

                getProject(data.checked, data.searchData)
            }
        }
        else if (data.idProject) {
            setStep1(true)
            setIdProject(data.idProject)

        }

        else if(data.changePage) {
            await getProject(null,null,data.changePage)

        }









    }




    const clearMessage = () => {
        setShowMessage(null);
    };

    const changeStep = () => {
        setStep1(false)

        setTimeout(() => {
            setLoading(false)

        }, 1000)
    }

    const getProject = async (showDeleted, search ,currentPage) => {

        setSpinFilter(true)

        try {
            const data = {
                page: currentPage,
                pageSize: 5,
                showDeleted: showDeleted ? 1 : 0,
                search: search
            }
            await projectService.listProject(data).then((res) => {
                console.log(data)
                setProject(res.data.data);
                setTotalPage(res.data.last_page)
            })
            setSpinFilter(false)

        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    const itemsProject = [

        {
            title: <span className="font-bold text-sm cursor-pointer">Application</span>,

        },

        {
            title: <span className="font-bold text-sm cursor-pointer">Projet</span>,

        },



    ]

    const itemsProjectAdd = [

        {
            title: <span className="font-bold text-sm cursor-pointer">Application</span>,

        },

        {
            title: <span onClick={() => changeStep()} className="font-bold text-sm cursor-pointer">Projet</span>,

        },

        {
            title: <span className="font-bold text-sm cursor-pointer">{idProject ? 'Modifier projet' : 'Ajout projet'}</span>,

        },


    ]

    if (!step1) {

        if (loading) {
            return <LoaderPage />
        }

        return (<>
            <div className="flex flex-col gap-2 justify-center items-center p-10">
                <BreadcrumbCustom items={itemsProject} />

                <div className="mb-10">

                    {user ? (
                        <Project
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            user={user}
                            changePage={getChange}
                            refreshData={getChange}
                            list={project}
                            clearMessage={clearMessage}
                            page={totalPage}
                            showMessage={showMessage}
                            addProject={getChange}
                            spinFilter={spinFilter}
                            updateProject={getChange}
                            searchData={getChange}
                        />
                    ) : (
       <LoaderPage/>
)}


                </div>
            </div>

        </>)


    } else {


        if (loading) {
            return <LoaderPage />
        }

        return (<>
            <div className="flex flex-col gap-2 justify-center items-center p-10">
                <BreadcrumbCustom items={itemsProjectAdd} />
                <div className="w-full">
                    <AddProject idProject={idProject} addProject={getChange} />
                </div>

            </div>
        </>)


    }

}

export default FormDisplayProject