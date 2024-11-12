import { Breadcrumb } from 'antd';


export const BreadcrumbCustom = ({items}) => {

     return (
        <Breadcrumb>
          {items.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {item.title}
             
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      );
}