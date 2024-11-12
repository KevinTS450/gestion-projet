import React from "react";
import { useState, useEffect } from "react";
import { CustomListUsers } from "../../../utils/List/list";
import { UnorderedListOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons';
import { Dropdown } from "antd";
import { BasicModal } from "../../../utils/Modals/Modals";
import RolesAssignement from "../RolesAssignement/RolesAssignement";
import SearhBar from "../../../Project/component-form/Project/searchProject";
import { SlideToggle } from "../../../utils/switch/switch";
import { Loader } from "../../../utils/spiner/spiner";


function ListUsers(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [UserSelected, setUserSelected] = useState(null)
    const [showDesativate , setShowDesativate]=useState(false)
    const [searchData , setSearchData]=useState("")


    const handleOk = () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getChange = (data) => {

        if (data.refresh) {

            const dataToSend = {
                refresh: true
            }
            props.refreshData(dataToSend)
        }
        if (data.closeModal) {
            setIsModalOpen(false)

        }

        if(data.changePage) {
            
            const dataToSend = {
                changePage:data.changePage
            }
            props.changePage(dataToSend)
        }

    }




    const roleAssignement = (item) => {

        setIsModalOpen(true)
        setUserSelected(item)
    }

    const roleAssignementContent = () => {

        return (
            <>
                <BasicModal
                    title={"Assignement des roles"}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}


                >

                    <RolesAssignement
                        roles_setting={props.roles}
                        refreshData={getChange}
                        users={UserSelected}

                    />


                </BasicModal>

            </>

        )
    }

    const itemsDropDown = (item) => {

        const isAdmin = props.userConnected.roles && props.userConnected.roles.some((item) => item.value == 'administrateur');

        return [


            ...(isAdmin
                ? [
                    {
                        label: (
                            <span onClick={() => roleAssignement(item)} className="cursor-pointer">
                                <UserOutlined /> Role assignement
                            </span>
                        ),
                        key: '1',
                    },
                    {
                        type: 'divider',
                    },
                ]
                : []),
            {
                label: (<span onClick={() => showProfileOfUsers(item.id)} > <ProfileOutlined /> Profile infos </span>),
                key: '3',
            },
        ];
    };

    const showProfileOfUsers = (id) => {

        const dataToSend = {
            id_users: id
        }
        props.showProfile(dataToSend)

    }

    const getDataSearch = (data) => {

        setSearchData(data)
        
        const dataToSend = {
            search : data ,
            filter:true ,
            showDesactivateUsers : showDesativate
        }
        props.filter(dataToSend)

    }

    const handleToggleChange  = (value) => {
        
        setShowDesativate(value)

        const dataToSend = {
            search : searchData ,
            filter:true ,
            showDesactivateUsers : value
        }

        props.filter(dataToSend)

    }


    const renderAction = (item) => {


        return (<>

            {item.name != props.userConnected.users.name ?
                (
                    <Dropdown
                        menu={{
                            items: itemsDropDown(item),
                        }}
                        trigger={['click']} >
                        <span className="cursor-pointer">
                            <UnorderedListOutlined />

                        </span>

                    </Dropdown>
                ) : (null)}
        </>)

    }


    return (
        <>
            <div className="container mx-auto py-10">

                <div className="flex justify-center">
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-6 px-4 w-full">

                        <div className="col-span-4 w-full sm:col-span-9 justify-center h-[400px]">

                            <div className="bg-white w-full flex flex-col gap-5 shadow rounded-lg p-6 w-[1000px]">
                                <div className="flex flex-row justify-between mt-5">
                                    <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
                                    <div className="flex gap-2 items-center flex-row">
                                        <div className="w-2/4">
                                        <SearhBar
                                            search={getDataSearch}
                                            label={"recherche un utilisateur"}
                                        />
                                        </div>
                                      
                                        <SlideToggle
                                        text={"afficher les utilisateur descativé"}
                                        onChange={handleToggleChange}
                                        />
                                    </div>




                                </div>

                                {isModalOpen && roleAssignementContent()}
                               {props.spinFilter ? (<Loader/>) : (<CustomListUsers
                                    changePage={getChange}
                                    action={renderAction}
                                    data={props.user}
                                    currentPage={props.currentPage}
                                    totalPage={props.page}
                                    setCurrentPage={props.setCurrentPage}
                                />) }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default ListUsers;