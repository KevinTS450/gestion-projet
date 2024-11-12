import React, { useState, useEffect } from "react";
import Profile from "./Profile/Profile";
import { UserService } from "../service/User.service";
import { LoaderPage } from "../../utils/spiner/spiner";
import { serviceConfig } from "../../../config/Service.config";


function FromDisplayProfile(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUser = async () => {
        try {
            await UserService.getUsers().then((res) => {
                const userData = res.data;
      
                if (userData.users) {
       
                    userData.users.date_naissance =serviceConfig.convertDate(userData.users.date_naissance);
                    userData.users.gender = userData.users.gender == 'male' ? 'Masculin' :'feminin'
                }

                setUser(userData);

            });
        } catch (err) {
            setError("Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        getUser();
    }, []);

    const getDataRefresh = async (data) => {
        if (data) {

            console.log(data)
            await getUser();

        }
    }

    if (loading) {
        return <LoaderPage />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <Profile 
              refreshData={getDataRefresh} 
              account={user} 
              />;
}

export default FromDisplayProfile;
