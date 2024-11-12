import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmationModals } from "../../utils/Modals/Modals";
import { AuthService } from "../../Auth/service/Auth.service";
import { UserOutlined } from '@ant-design/icons';
import CardProfileNav from "./CardProfileNav";
import { UserService } from "../../Profile/service/User.service";
import { serviceConfig } from "../../../config/Service.config";
function NavBarWithLogin() {



    const [showCard, setShowCard] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
   getUsers()
    }, [])

    const getUsers = async () => {

        await UserService.getUsers().then((res) => {
            const userData = res.data;

            if (userData.users) {
                userData.users.date_naissance = serviceConfig.convertDate(userData.users.date_naissance);
                userData.users.gender = userData.users.gender === 'male' ? 'Masculin' : 'Féminin';
                const pseudo = userData.users.name.charAt(0).toUpperCase(); // Prend la première lettre en majuscule

                userData.users.pseudo = pseudo;


                setUser(userData);
            }
        })

    }


    const handleMouseEnter = () => {
        if (!showCard) {
            setShowCard(true);

        } else {
            setShowCard(false);

        }

    }
    const handleMouseLeave = () => setShowCard(false);
    const navigation = [

        { name: 'Dashboard', href: '#', current: true },
        { name: 'Team', href: '/ListUser', current: false },
        { name: 'Projects', href: '/project', current: false },
        { name: 'Calendar', href: '#', current: false },
    ]

    const navigation_left = [

        { name: <UserOutlined /> },


    ]

    const logOut = () => {

        confirmationModals('vous voulez vous deconnecter', 'deconnexion', handleLogout)
    }

    const handleLogout = async () => {
        try {
            const res = await AuthService.LogGout();
            console.log(res);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const triggerCardProfile = () => {
        setShowCard(true)
    }


    return (


        <><div className="hidden sm:flex sm:items-center sm:mr-10 space-x-4">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    {item.name}
                </Link>
            ))}


        </div><div className="flex flex-row justify-center gap-x-10">

                {user ? (
                    <>
                        {navigation_left.map((item, index) => (
                            <Link
                                key={index}
                                onClick={handleMouseEnter}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <span onClick={triggerCardProfile}>{item.name}</span>
                            </Link>
                        ))}
                    </>
                ) : null}

                <div className="absolute bottom-0 right-3 transform translate-y-full w-1/4 z-10">
                    {showCard && (<CardProfileNav

                        data={user}
                        logOut={logOut}
                        onMouseLeave={handleMouseLeave}

                        style={'w-[350px] border mt-2 border-gray-400'}
                    />)}
                </div>
            </div></>


    )
}
export default NavBarWithLogin