import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import {
    DownCircleOutlined,
  FileOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Downloads from '../Downloads';
import Pictures from '../Pictures';
import Files from '../Files';
import { fileData } from '../../fileData';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Download', 'download', <DownCircleOutlined />,<Downloads/>),
  getItem('Picture', 'picture',<PictureOutlined />,<Pictures/>),
  
  getItem('Files', 'files', <FileOutlined />,<Files/>),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate= useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleOnclick=(e)=>{
navigate(`/${e.key}`)

  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={fileData}  onClick={handleOnclick}  />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet/>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          footer
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;