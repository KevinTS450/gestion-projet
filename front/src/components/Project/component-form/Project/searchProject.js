import { Input } from "antd";
import React from "react";
import { useState,useEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';

function SearhBar (props) {

    const listenData = (e) => {

        const value = e.target.value
        props.search(value)

    }

    return (<>
    <Input type="text"
     addonBefore={<SearchOutlined/>} 
     placeholder={props.label} 
     onChange={listenData}
     />
    </>)
}

export default SearhBar