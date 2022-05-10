import React from'react';
import { useLocation } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Input,Card,Button,Row } from 'antd';
import Menu_1 from './Menu_1.js';
const { Header, Footer, Content } = Layout;
function View(){
    let location = useLocation();
    const server_id = location.state;
    let e=server_id.email;
    let p=server_id.password;
    var mobile = require('is-mobile');

    return(
        <Layout className="layout">
            <Header style={{ position: "fixed", zIndex: 1, paddingLeft:mobile()?"0px":"50px",paddingRight:mobile()?"0px":"50px",width:"100%",}}>
            <Menu_1/>
            </Header>
            <Layout style={{ overflowY: 'hidden' }}>
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
                    <Row justify="center" align="middle" className="login_site_ground">
				      <Card  title="用户登录" className="login_card">
				       <Input placeholder="用户名/手机/邮箱" className="login_user_input"/>
				       <br/>
				       <Input.Password
				        className="login_user_password"
				        placeholder="请输入密码"
				         />
						 <br/>
				        <Button type="primary" className="login_btn" >登录</Button>
			          </Card> 
					</Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )

}

export default View;

