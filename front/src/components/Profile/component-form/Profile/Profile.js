import React from "react";
import { useState } from "react";
import { BasicModal } from "../../../utils/Modals/Modals";
import Docs from "./Docs";
function Profile(props) {
    console.log(props)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getRefreshData = (data) => {
       
       props.refreshData(data)
    }

    const experiences = [
        { title: "Web Developer", company: "ABC Company", date: "2017 - 2019", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Web Developer", company: "XYZ Company", date: "2019 - 2021", description: "Sed finibus est vitae tortor ullamcorper." },
        { title: "Senior Developer", company: "LMN Corp", date: "2021 - Present", description: "Aenean posuere risus non velit egestas suscipit." },
    ];



    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://randomuser.me/api/portraits/men/94.jpg"
                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4"
                                    alt="Profile"
                                />
                                <h1 className="text-xl font-bold">{props.account.users.name ? props.account.users.name : null}</h1>
                                <p className="text-gray-700">{props.account.users.email ? props.account.users.email : null}</p>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                                    <a onClick={()=>showModal()} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded cursor-pointer">Document</a>

                                    <BasicModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        title={props.viewProfile ? "document rataché" : "Mes documents"}
                                    >
                                        <Docs  
                                        refreshData={getRefreshData} 
                                        user_id={props.account.users.id} 
                                        docs={props.account.attachement}
                                        viewProfile={props.viewProfile ? props.viewProfile : null}
                                        />
                                    
                                    </BasicModal>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">A propos</span>
                                <ul>
                                    {props.account.roles && props.account.roles.map((items) => (
                                    <li className="mb-2">{items.value}</li>

                                    ))}
                                    <li className="mb-2">Date de naissance : {props.account.users.date_naissance} </li>
                                    <li className="mb-2">genre : {props.account.users.gender} </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis.</p>
                            <h3 className="font-semibold text-center mt-3 -mb-2">Find me on</h3>
                            <div className="flex justify-center items-center gap-6 my-6">
                                {/* Social Links Here */}
                            </div>
                            <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                            {experiences.map((exp, index) => (
                                <div className="mb-6" key={index}>
                                    <div className="flex justify-between flex-wrap gap-2 w-full">
                                        <span className="text-gray-700 font-bold">{exp.title}</span>
                                        <p>
                                            <span className="text-gray-700 mr-2">at {exp.company}</span>
                                            <span className="text-gray-700">{exp.date}</span>
                                        </p>
                                    </div>
                                    <p className="mt-2">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
