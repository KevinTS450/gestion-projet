import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const truncateFilename = (filename, maxLength = 45) => {
  if (filename.length <= maxLength) return filename;
  const truncated = filename.slice(0, maxLength - 3) + '...'; 
  return truncated;
};

const DraggerFile = ({ fileList, setFileList })=> {
 

    const props = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            setFileList((prevFileList) => [...prevFileList, file]);
            message.success(`${file.name} file added to list.`);

            return false;
          },
       
        onRemove(file) {
          setFileList((prevFileList) => prevFileList.filter(f => f.uid !== file.uid));
          message.info(`${file.name} file removed from the list.`);
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        fileList: fileList.map(file => ({
          ...file,
          name: truncateFilename(file.name), 
        })),
      };      

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Cliquer ou deplacer des fichier ici</p>
      <p className="ant-upload-hint">
         Seule les fichier en pdf sont prise en compte.
      </p>
    </Dragger>
  );
};

export default DraggerFile;
