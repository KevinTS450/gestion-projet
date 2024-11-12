import { Alert } from "antd";


export const MessageAlert = (props) => {

    return ( <>
    
    <Alert type={props.type} message={props.message}  banner />

    </>)
}