import React from "react";
import { useState, useEffect } from "react";
import { UserMangeService } from "../service/UsersManage.service";
import { LoaderPage } from "../../utils/spiner/spiner";
import ListUsers from "./ListUsers/ListUsers";
import { UserService } from "../../Profile/service/User.service";
import { Dropdown } from "antd";
import { BreadcrumbCustom } from "../../utils/breadCrumb/breadCrumb";
import Profile from "../../Profile/component-form/Profile/Profile";
function FormDisplayUsersManage(props) {

    const [user, setUser] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] =useState(1)
    const [pageSize , setPageSize]=useState(1)
    const [searchData, setSearchData] = useState("")
    const [userConnected, setUserConnected] = useState(null)
    const [showDesactivate , setShowDesativateUsers]=useState(false)
    const [roles, setRoles] = useState([])
    const [listUsersState, setListUsersState] = useState(true)
    const [ProfileState, setProfileStatesState] = useState(false)

    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [spinFilter , setSpinFilter]=useState(false)
  
  
    useEffect(() => {
        getAllRoles()
        DisplayListUsersListUsers(currentPage,searchData ,showDesactivate)
        getUsersConnected()
    }, [])

    let items = [];

    const changeState = (state) => {

        switch (state) {
            case 'list_utilisateur':

                setListUsersState(true)
                setProfileStatesState(false)
                break

            case 'profile_users':
                setProfileStatesState(true)

                setListUsersState(false)

                break

                
        }

        DisplayListUsersListUsers(currentPage,searchData,false)

    }

    if (listUsersState) {
        items = [
            {
                title: <span className="font-bold text-sm cursor-pointer">Application</span>,
            },
            {
                title: <span onClick={() => changeState('list_utilisateur')} className="font-bold text-sm cursor-pointer">Liste des utilistateur</span>,
            }
        ];
    }
    if (ProfileState) {
        items = [
            {
                title: <span className="font-bold text-sm cursor-pointer">Application</span>,
            },
            {
                title: <span onClick={() => changeState('list_utilisateur')} className="font-bold text-sm cursor-pointer">Liste des utilistateur</span>,
            },
            {
                title: <span onClick={() => changeState('profile_users')} className="font-bold text-sm cursor-pointer">Profile utilisateur</span>,
            }
        ];
    }



    const getUsersConnected = async () => {
        try {
            await UserService.getUsers().then((res) => {
                console.log(res)
                setUserConnected(res.data)
            })

        } catch (error) {

            console.error(error)
        }
    }

    const getChange = (data) => {

        if (data.refresh) {
            DisplayListUsersListUsers(currentPage,searchData ,showDesactivate)
        }
        if (data.id_users) {
            setListUsersState(false)
            setProfileStatesState(true)
            try {
                setLoading(true)
                showProfileUsers(data.id_users)

            } catch (error) {
                console.error()
            } finally {
                setLoading(false)

            }

        }


        if(data.filter) {
           
            setSearchData(data.search)
            setShowDesativateUsers(data.showDesactivateUsers)
            DisplayListUsersListUsers(currentPage,data.search,data.showDesactivateUsers)

        }

      if(data.changePage) {
            DisplayListUsersListUsers(data.changePage ,null)

        }

    }

    const showProfileUsers = async (id_users) => {

        const res = await UserMangeService.showProfileUsers(id_users)
        setUserProfile(res.data)
    }

    const DisplayListUsersListUsers = async (currentPage,search ,showDesactivate) => {

        try {

            setSpinFilter(true)
            const data = {
                page: currentPage,
                pageSize: 5,
                search: search ,
                showDesactivate:showDesactivate ? 1 :0
            }
            const res = await UserMangeService.ListUsers(data);
            console.log(res.data)
            setTotalPage(res.data.last_page)


            const originalUserData = res.data.data;

            const userInfo = originalUserData.map(user => ({

                ...user,
                pseudo: `${user.email.charAt(0).toUpperCase()}`,
            }));

            setUser(userInfo);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setSpinFilter(false)

        }

    }

    const getAllRoles = async () => {

        const roles = await UserMangeService.AllRoles();

        setRoles(roles.data.roles)
    }

    if (loading) {
        return (<LoaderPage />)
    }

    return (

        <div className="flex flex-col items-center gap-2 p-10">
            <BreadcrumbCustom items={items} />
            {listUsersState && (
                userConnected && roles ? (
                    <ListUsers
                        changePage={getChange}
                        filter={getChange}
                        spinFilter={spinFilter}
                        showProfile={getChange}
                        page={totalPage}
                        userConnected={userConnected}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        roles={roles}
                        refreshData={getChange}
                        user={user}
                    />
                ) : (
                    <LoaderPage />
                )
            )}
            {ProfileState ? (
                userProfile ? (
                    <Profile
                        account={userProfile}
                        viewProfile={true}
                    />
                ) : (
                    <LoaderPage />
                )
            ) : null}




        </div>
    )

}

export default FormDisplayUsersManage