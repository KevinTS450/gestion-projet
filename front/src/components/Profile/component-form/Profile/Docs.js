import React, { useEffect, useState } from "react";
import { UserService } from "../../service/User.service";
import { FilePdfOutlined, UploadOutlined ,DeleteOutlined } from '@ant-design/icons'
import { CustomListDocs } from "../../../utils/List/list";
import DraggerFile from "../../../utils/dragger/dragger";
import { serviceConfig } from "../../../../config/Service.config";
import { Button } from "antd";
import { Message } from "../../../utils/toast.service";
function Docs(props) {

    const [fileList, setFileList] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {
        updateData()

        if (props.refreshData) {
            updateData()

        }
    }, [props.refreshData])

    const updateData = () => {

        if (props.docs) {

            const toSend = []
            const data = props.docs

            data.map((items) => {

                const title = items.docs_name
                const description = serviceConfig.convertBytes(items.docs_size)


                toSend.push({ ...items, title: title, size: description })

            })

            setData(toSend)
        }
    }

    const uploadDocs = async () => {



        const formData = new FormData()

        formData.append('user_id', props.user_id)
        fileList.forEach((file) => {
            formData.append('file[]', file);
        });

        const docs = await UserService.attachDocs(formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        if (docs) {
            Message('success', 'topRight', 'document ajouté !')

            props.refreshData(true)
        }
    }

    const getDocs = async (filename) => {

        const res = await UserService.showDocs(filename)
        const urlBlob = window.URL.createObjectURL(res)
        window.open(urlBlob);

    }


    const action = (id) => {
        return (
            <span onClick={()=>deleteDocs(id)} className="hover:underline cursor-pointer" >
                <DeleteOutlined /> Supprimer
            </span>
        );
    }

    const deleteDocs = async (id) => {
        if(id) {
            const docs = await UserService.deleteDocs(id)
             console.log(docs)
            if(docs) {
                props.refreshData(true)
                Message('error' ,'topRight' ,'document supprimer')
            }
        }

    }

    return (<>
        {props.docs && props.docs.length ? (
            <CustomListDocs
                action={action}
                file={getDocs}
                data={data}
                icon={<FilePdfOutlined />}
            />
        ) : ('Aucun document')}
        {!props.viewProfile && (  <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <DraggerFile fileList={fileList} setFileList={setFileList} />
            <Button onClick={() => uploadDocs()} disabled={!fileList.length} type="primary" icon={<UploadOutlined />} size='large' >Upload</Button>
        </div>) }
      

    </>)
}
export default Docs