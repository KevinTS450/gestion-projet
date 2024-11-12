
import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {  Modal } from 'antd';
const { confirm } = Modal;


export const confirmationModals = (description, title, onConfirm) => {
    confirm({
        title: title,
        icon: <ExclamationCircleFilled />,
        content: description,
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    onConfirm().then(resolve).catch(reject);
                }, 1000);
            }).catch(() => console.log('Oops, errors!'));
        },
        onCancel() {},
    });
};


export const BasicModal = ({ isOpen, onOk, onCancel, onClose, title, children }) => {
  const footer = [];

  if (onOk) {
    footer.push(<button key="ok" onClick={onOk}>Ok</button>);
  }

  if (onCancel) {
    footer.push(<button key="cancel" onClick={onCancel}>Cancel</button>);
  }

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose} 
      footer={footer.length > 0 ? footer : null}
    >
      {children}
    </Modal>
  );
};
