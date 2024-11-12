import { Alert, Flex, Spin } from 'antd';
export const Loader = (props) => {
    return <Spin spinning={props.spiner}> </Spin>
}

const loaderStyle = {
   
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
};

export const LoaderPage = () => {
    return (
        <div className='h-[500px]' style={loaderStyle}>
            <Spin tip="Loading" size="large" />
        </div>
    );
};




