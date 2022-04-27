import React from'react';
import { useLocation } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Footer, Content } = Layout;
function View(){
    let location = useLocation();
    const server_id = location.state;
    let e=server_id.email;
    let p=server_id.password;

    return(
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items = {[
                        { label: '菜单项一' },
                        {label: (<a href="/#/login" target="_blank" rel="noopener noreferrer">登录</a>),},
                        {label: (<a href="/#/user/add" target="_blank" rel="noopener noreferrer">注册</a>),},
                      ]}
                    // items={new Array(15).fill(null).map((_, index) => {
                    //     const key = index + 1;
                    //     return {
                    //         key,
                    //         label: `nav ${key}`,
                    //     };
                    // })}
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <div>{e}</div>
                    <div>{p}</div>
                    <div>Hello world!</div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )

}

export default View;

