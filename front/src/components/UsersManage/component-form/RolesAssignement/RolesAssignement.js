import { Input, Select, Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { UserOutlined } from '@ant-design/icons';
import { UserMangeService } from "../../service/UsersManage.service";
import { Message } from "../../../utils/toast.service";
function RolesAssignement(props) {
    const [options, setOptions] = useState([]);
    const [role_value, setRoleValue] = useState([])
    const [roleValueInput, setRoleValueInput] = useState([])
    const [removedValues, setRemovedValues] = useState([]);


    useEffect(() => {
        initRolesAssignement()
    }, [props.roles_setting, props.users.roles])




    const initRolesAssignement = () => {

        const newOptions = props.roles_setting.map((item) => ({
            value: item.id,
            label: item.value
        }));
        setOptions(newOptions);



        if (props.users.roles.length) {
            const roles = props.users.roles.map(role => role.id);
            const roles_input = props.users.roles.map(role => role.value);
            const roles_input_formated = roles_input.join('/')
            setRoleValueInput(roles_input_formated)
            setRoleValue(roles);
        }
    }

    const handleChange = (newValue) => {

        const removed = role_value.filter(value => !newValue.includes(value));

        console.log(removed)
        if (removed.length > 0) {
            setRemovedValues(prevRemoved => {
                const newRemoved = [...prevRemoved, ...removed];
                return [...new Set(newRemoved)];
            });

        }
        setRoleValue(newValue)

    }

    const formDataSetting = (id_roles_settings, state) => {

        const data = {
            id_users: props.users.id,
            id_roles_setting: id_roles_settings,
            state: state
        }
        return data
    }
    const rolesAssignementAction = async () => {

        if (props.users.roles.length) {

            let data

            if (removedValues.length) {

                data = formDataSetting(removedValues, 'delete')

            } else {

                data = formDataSetting(role_value, 'add')

            }
            await UserMangeService.assignRoles(data)


            Message('info', 'topRight', 'les roles on etait mis a jour')

            const dataToSend = {
                refresh: true,
                closeModal: true
            }

            props.refreshData(dataToSend)


        } else {
            const data = formDataSetting(role_value, 'add')

            await UserMangeService.assignRoles(data)



            Message('info', 'topRight', 'les roles on etait ajouter')


            const dataToSend = {
                refresh: true,
                closeModal: true
            }

            props.refreshData(dataToSend)


        }
    }


    return (<>
        <div className="flex flex-col gap-5 p-5">
            <label> Role de l'utilisateur </label>
            {props.users.roles.length == 0 ? (
                <><Input
                    addonBefore={<UserOutlined />}
                    type="text"
                    readOnly
                    value="utilistateur" /></>

            ) : (<Input
                addonBefore={<UserOutlined />}
                type="text"
                readOnly
                value={roleValueInput} />)}

            <label> Choisir un role  </label>
            <Select
                mode="tags"
                style={{
                    width: '100%',
                }}
                onChange={handleChange}
                tokenSeparators={[',']}
                options={options}
                value={role_value}
            />

            <div className="mt-2 flex justify-end">

                <Button onClick={() => rolesAssignementAction()} type="primary" > Assigner les roles</Button>


            </div>

        </div>


    </>)

}

export default RolesAssignement