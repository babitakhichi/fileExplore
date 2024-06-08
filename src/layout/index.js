import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { fileData } from '../fileData';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/fileSlice";
import { Download } from "../pages";

const { Header, Content, Footer, Sider } = Layout;

function PublicLayout() {
  const userData = useSelector(selectUserData)

  const [collapsed, setCollapsed] = useState(false);
  const navigate= useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleOnclick=(e)=>{
navigate(`/${e.key}`)

  }
  return  <Layout
  style={{
    minHeight: '100vh',
  }}
>
  <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <div className="demo-logo-vertical" />
    {userData.length> 0&&
    <Menu theme="dark" defaultSelectedKeys={['download']} mode="inline" items={userData}  onClick={handleOnclick}   />}
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
    
      <Download/>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      footer
    </Footer>
  </Layout>
</Layout>;
}

export default PublicLayout;
