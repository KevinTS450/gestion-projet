import { notification } from "antd";



export const Message = (type, placement, message, description = '') => {

    if (type == 'success') {

        notification.success({
            message: `${message}`,
            description: `${description}`,
            placement,
        });
    }

    if (type == 'info') {

        notification.info({
            message: `${message}`,
            description: `${description}`,
            placement,
        });
    }

     if (type == 'error') {

            notification.error({
                message: `${message}`,
                description: `${description}`,
                placement,
            });
        }

        if (type == 'warning') {

            notification.warning({
                message: `${message}`,
                description: `${description}`,
                placement,
            });
        }

    }




