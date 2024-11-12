import React from 'react';
import { List, Avatar, Button } from 'antd';
import { useState } from 'react';
import { Pagination } from '../pagination/pagination';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Checkbox } from 'antd';
import { serviceConfig } from '../../../config/Service.config';
export const CustomListDocs = ({ data, icon, file = '', action }) => {


  const showPdf = async (filename) => {
    file(filename)
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}

      renderItem={(item) => (
        <List.Item
          actions={[action(item.id)]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={icon || null} />}
            title={<a onClick={() => showPdf(item.title)} >{item.title}</a>}
            description={item.size}
          />
        </List.Item>
      )}
    />
  );
};

export const CustomListProject = ({ data, currentPage, setCurrentPage, totalPage, icon = null, action = null, check, itemsDropDown = null ,changePage }) => {


  const [selectedItems, setSelectedItems] = useState([]);


  const handleCheckboxChange = (e, itemId) => {


    const newSelectedItems = e.target.checked
      ? [...selectedItems, itemId]
      : selectedItems.filter(id => id !== itemId);
    setSelectedItems(newSelectedItems);
    check(newSelectedItems)
  };


  const renderTitle = (nom, id) => {

    const menuList = itemsDropDown(id);

    return (
      <div className='flex flex-row gap-5 items-center'>
        <span className="font-semibold text-xl">{nom}</span>

        <Dropdown
          menu={{
            items: menuList,
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UnorderedListOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

    )
  }

  const handlePageChange = (data) => {
    const dataToSend = {
      changePage:data
    }
    changePage(dataToSend)
  }

  const description = (desc, date_debut, date_fin) => {

    return (
      <>
        <div className='flex flex-row gap-2 mt-5'>
          <span><CalendarOutlined /></span>
          <span >{serviceConfig.convertDate(date_debut)}</span> -
          <span >{serviceConfig.convertDate(date_fin)}</span>
        </div>

        <div className='flex flex-col gap-2'>
          <span >  {desc}</span>



        </div></>

    )
  }



  return (
    <div className='flex flex-col gap-5' >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[action(item.id, item.etat)]}
            extra={
              <img
                width={150}
                alt="logo"
                src="/thumbs/projet.png"
              />
            }
          >
            <div className="flex flex-row items-center gap-5">
              <Checkbox
                onChange={(e) => handleCheckboxChange(e, item.id)}
                className='self-start mt-2'
              />
              <List.Item.Meta
                className="w-full"
                title={renderTitle(item.nom, item.id)}
                description={description(item.description, item.date_de_debut, item.date_de_fin_prevue)}
              />
            </div>



          </List.Item>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
        changePage={handlePageChange}
      
      />

    </div>


  )


}

export const CustomListUsers = ({ data, currentPage, setCurrentPage, totalPage, icon = null, action = null, check, itemsDropDown = null ,changePage }) => {


  const handlePageChange = (data) => {
    const dataToSend = {
      changePage:data
    }
    changePage(dataToSend)
  }

  const renderTitle = (item) => {


    return (
      <div className='flex flex-row gap-2 items-center'>
        <div className="flex items-center justify-center  h-7 bg-gray-500 rounded-full text-white font-bold p-3">
          {item.pseudo}
        </div>
        <span className="font-semibold text-xl">{item.email}</span>


      </div>

    )
  }

  const renderDescription = (item) => {

    return (<>
      {item.roles.length ? (
        <>
          {item.roles.length > 0 && (
            <span className='text-gray-500 ml-10'>
              {item.roles.map((data, index) => (
                <span key={index}>
                  {data.value}
                  {index < item.roles.length - 1 && " / "}
                </span>
              ))}
            </span>
          )}
        </>
      ) : (<span className='text-gray-500 ml-10'>Utilisateur</span>)}


    </>)
  }

  return (
    <div className='flex flex-col gap-5'>

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            actions={[action(item)]}

          >
            <List.Item.Meta
              title={renderTitle(item)}
              description={renderDescription(item)}
            />
          </List.Item>
        )}
      />

<div className='flex justify-center'>

<Pagination

currentPage={currentPage}
totalPages={totalPage}
onPageChange={setCurrentPage}
changePage={handlePageChange}
/>
</div>
      

    </div>
  )

}

