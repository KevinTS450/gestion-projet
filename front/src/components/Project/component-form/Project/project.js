import React from "react";
import { useState, useEffect } from "react";
import { Button, List, Skeleton, Avatar, Input, Dropdown } from "antd";
import { Message } from "../../../utils/toast.service";
import { CustomListProject } from "../../../utils/List/list";
import { DeleteOutlined, UploadOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { projectService } from "../../service/project.service";
import { BasicModal, confirmationModals } from "../../../utils/Modals/Modals";
import { SlideToggle } from "../../../utils/switch/switch";
import { Loader } from "../../../utils/spiner/spiner";
import SearhBar from "./searchProject";
import DetailsProject from "./DetailsProject";


function Project(props) {

  const [showDelteMultiple, setShowDeleteMultiple] = useState(false)
  const [selectedIds, setSelectedIds] = useState(false)

  const [search, setSearchData] = useState("")
  const [checked, setChecked] = useState(false)
  const [idProject, setIdproject] = useState(0)
  const [detailsProject, setDetailsProject] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {

    if (props.showMessage) {

      const timeoutId = setTimeout(() => {
        Message(props.showMessage.type, 'topRight', props.showMessage.message);

        props.clearMessage();

      }, 500);


      return () => clearTimeout(timeoutId);
    }


  }, [props.showMessage]);




  const itemsDropDown = (projectId) => {
    const isAdmin =props.user.roles.value === 'administrateur'; // Vérifie si l'utilisateur est administrateur
  
    return [
      {
        label: (
          <span onClick={() => showModal(projectId)} className="cursor-pointer">
            <SnippetsOutlined /> Détails
          </span>
        ),
        key: '0',
      },
      {
        type: 'divider',
      },
      ...(isAdmin
        ? [
            {
              label: (
                <span onClick={() => showAssignement(projectId)} className="cursor-pointer">
                  <UserOutlined /> Assignement
                </span>
              ),
              key: '1',
            },
            {
              type: 'divider',
            },
          ]
        : []), // Ajoute l'élément d'assignement seulement si l'utilisateur est admin
      {
        label: `3rd menu item for project ${projectId}`,
        key: '3',
      },
    ];
  };
  

  const changeStep = () => {
    const dataToSend = {
      swicth_add: true
    }
    props.addProject(dataToSend)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAssignement, setIsModalOpenAssignement] = useState(false);



  const showModal = async (id) => {
    setIsModalOpen(true);
    setIsModalOpenAssignement(false)
    setIdproject(id)

    await projectService.getProject(id).then((res) => {


      setDetailsProject(res.data)

    })



  };

  const deleteMultiple = () => {

    confirmationModals('vous ete sur de tous supprimer ces projets ?', 'suppression multiple', () => deleteMultipleAction())
  }

  const deleteMultipleAction = async () => {

    await projectService.deleteProject(1, selectedIds).then((res) => {
      if (res.data == 1) {

        const data_to_send = {
          refresh: true,
          show_delete_message: true,
          message: "Les projet ont etait supprimé",
          type: 'error'
        }
        props.refreshData(data_to_send)
        setShowDeleteMultiple(false)
      }
    })
  }

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenAssignement(false);

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkAssignement = () => {
    setIsModalOpenAssignement(false);
  };

  const handleCancelAssignement = () => {
    setIsModalOpenAssignement(false);
  };



  const deleteModals = (id, etat) => {

    confirmationModals(etat == -1 ? 'vous voulez supprimer définitivement ce projet ?' : 'vous voulez supprimer ce projet', 'Suprression de projet', () => deleteProject(id, etat)
    )
  }

  const restaureModals = (id) => {

    confirmationModals('vous voulez restauré ce projet ?', 'Restauration de projet', () => restaureProject(id)
    )
  }

  const deleteProject = async (id, etat) => {

    await projectService.deleteProject(1, id).then((res) => {
      if (res) {
        const data_to_send = {
          refresh: true,
          show_delete_message: true,
          message: "Le projet a etait supprimé",
          type: etat == -1 ? 'error' : 'info'
        }
        props.refreshData(data_to_send)

      }

    });

  }

  const update = (id) => {

    const data_to_send = {
      idProject: id
    }
    props.updateProject(data_to_send)

  }

  const restaureProject = async (id) => {

    await projectService.deleteProject(0, id).then((res) => {
      if (res) {
        const data_to_send = {
          refresh: true,
          show_restaure_message: true,
          message: "Le projet a etait restauré",
          type: 'success'
        }
        props.refreshData(data_to_send)

      }

    });
  }

  const handleToggleChange = (checked) => {

    setChecked(checked)
    const data = {
      showDeletedProject: 'show',
      checked: checked,
      searchData: search,
      filter: true,
      refresh: true
    }
    props.refreshData(data)


  };


  const getData = (data) => {

    if (data.length) {
      setShowDeleteMultiple(true)
      setSelectedIds(data)
    } else {
      setShowDeleteMultiple(false)

    }


    if(data.changePage) {
      const dataToSend = {
        changePage:data.changePage
      }
      props.changePage(dataToSend)
    }

  }

  const searchData = (data) => {

    setSearchData(data)

    const data_to_send = {
      searchData: data,
      checked: checked,
      filter: true,
      refresh: true
    }
    props.searchData(data_to_send)

  }

  const details = () => {



    if (isModalOpen) {

      return (<>

        {idProject ? (<BasicModal
          isOpen={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          title="Details du projet"
        >
          <DetailsProject
            project={detailsProject}
          />

        </BasicModal>) : (null)}
      </>)
    }

    if (isModalOpenAssignement) {

      return (<>

        <BasicModal
          title='Asignement'
          onOk={handleOkAssignement}
          isOpen={isModalOpenAssignement}
          onCancel={handleCancelAssignement}
        >



        </BasicModal>
      </>)

    }



  }

  const renderAction = (id, etat) => {



    return (<>

      <div className='flex flex-row gap-2'>


        <>
          {props.user.roles && props.user.roles.some((items) =>items.value=='administrateur')  ? (
            <>
              <Button onClick={() => update(id)} icon={<UploadOutlined />}>
                modifier
              </Button>

              <Button
                onClick={() => deleteModals(id, etat)}
                icon={<DeleteOutlined />}
                type="primary"
                danger
              >
                {etat === -1 ? 'supprimer définitivement' : 'supprimer'}
              </Button>

              {etat === -1 && (
                <Button type="primary" onClick={() => restaureModals(id)}>
                  Restaurer
                </Button>
              )}
            </>
          ) : (null)}
        </>

      </div>

    </>)
  }


  const filterTools = () => {

    return (<>

      <SearhBar
        search={searchData}
        label={'recherche un projet'}
      />

      <SlideToggle
        onChange={handleToggleChange}
        text={'afficher les projet supprimé'} />
    </>)
  }

  const content = () => {

    return (<>


      {details()}

      {props.spinFilter ? <Loader /> : (
        <CustomListProject
          check={getData}
          setCurrentPage={props.setCurrentPage}
          currentPage={props.currentPage}
          itemsDropDown={itemsDropDown}
          pageSize={5}
          action={renderAction}
          totalPage={props.page}
          changePage={getData}
          data={props.list} />
      )}
    </>)
  }


  const showAssignement = (id) => {
    setIsModalOpenAssignement(true)
    setIsModalOpen(false);

  }


  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex justify-center h-full">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-6 px-4 ">
            <div className="col-span-4 sm:col-span-9 justify-center">
              <div className="bg-white shadow rounded-lg p-6 w-[1000px]">
                <div className="flex flex-row justify-between items-center gap-2">
                  <h2 className="text-xl font-bold mb-4">Gestion de vos projets</h2>
                  <div className="flex flex-row gap-10">
                    {filterTools()}
                  </div>
                </div>
                <p className="text-gray-700">Liste de tous les projet sur le plateforme.</p>
                <div className="flex justify-center items-center gap-6 my-6">
                  {/* Social Links Here */}
                </div>
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-xl font-bold mt-6 mb-4">Project ({props.list.length})</h2>
                  {showDelteMultiple ? (<Button onClick={() => deleteMultiple()} type="primary" danger>Supprimer ({selectedIds.length})</Button>) : (null)}

                </div>
                {content()}
                <div className="flex justify-end">
                  <Button onClick={() => changeStep()} className="mt-5" type="primary" > Ajouter un nouveau projet </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Project