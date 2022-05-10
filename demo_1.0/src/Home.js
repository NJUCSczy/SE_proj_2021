import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./Home.css";
import SubmitApplication from "./Adiministration/SubmitApplication"
import { useState } from 'react';

import { Layout, Menu, Dropdown, Breadcrumb, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import Login from './register_login/pages/Login';
import RegisterPage from './register_login/pages/Register';
const { Header, Content, Footer, Sider } = Layout;

const MainPage = (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>首页</div>);

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PageContent: MainPage,
            userID: null,
            userIdentity: "user",
            userName: null,
            Authorization: null
        };
    }

    GotoPage = (PageName,_state) => {
        console.log(PageName);
        console.log(this.state);
        this.setState({
            PageContent: this.GetPageInfo(PageName,_state)
        })

    }

    GetPageInfo= (PageName,_state) => {
        switch(PageName){
            case 'MainPage': return MainPage;
            case 'Login': return (<Login UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'Register': return (<RegisterPage UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'SubmitApplication': return (<SubmitApplication _state={_state} GotoPage={this.GotoPage} />);
            case 'ViewApplication': return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>查看委托</div>);
            case 'Info1' : return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>机构信息</div>);
            case 'Info2' : return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>资质信息</div>);
            case 'Info3' : return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>政策法规</div>);
            case 'Info4' : return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>业务信息</div>);
            case 'Info5' : return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>新闻资讯</div>);
            case 'Info6' : return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>联系我们</div>);
        }
        return null;
    }

    UpdateUserInfo = (info) => {
        this.setState(info);
        console.log(this.state);
    }




    render() {
        var mobile = require('is-mobile');

        const infoMenu = (<Dropdown overlay={<Menu
            items={[
                { label: (<a onClick={() => { this.GotoPage('Info1', this.state) }}>机构信息</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info2', this.state) }}>资质信息</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info3', this.state) }}>政策法规</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info4', this.state) }}>业务信息</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info5', this.state) }}>新闻资讯</a>), },
                { label: (<a onClick={() => { this.GotoPage('Info6', this.state) }}>友情链接</a>), },
            ]} />} placement="bottom">
            <a onClick={e => e.preventDefault()}><Space>信息<DownOutlined /></Space></a>
        </Dropdown>)

        const userFunctionMenu = (<Dropdown overlay={<Menu
            items={[
                { label: (<a onClick={() => { this.GotoPage('SubmitApplication', this.state) }}>提交申请</a>), },
                { label: (<a onClick={() => { this.GotoPage('ViewApplication', this.state) }}>查看委托</a>), },
            ]} />} placement="bottom">
            <a onClick={e => e.preventDefault()}><Space>操作<DownOutlined /></Space></a>
        </Dropdown>)

        const staffFunctionMenu = (<Dropdown overlay={<Menu
            items={[
                { label: (<a onClick={() => { this.GotoPage('ViewApplication', this.state) }}>查看委托</a>), },
            ]} />} placement="bottom">
            <a onClick={e => e.preventDefault()}><Space>操作<DownOutlined /></Space></a>
        </Dropdown>)

        const adminFunctionMenu = (<Dropdown overlay={<Menu
            items={[
                { label: (<a onClick={() => { this.GotoPage('SubmitApplication', this.state) }}>提交申请</a>), },
                { label: (<a onClick={() => { this.GotoPage('ViewApplication', this.state) }}>查看委托</a>), },
            ]} />} placement="bottom">
            <a onClick={e => e.preventDefault()}><Space>操作<DownOutlined /></Space></a>
        </Dropdown>)

        return (
            <Layout style={{ overflow: 'hidden' }}>
                <Header style={{ position: "fixed", zIndex: 1, paddingLeft: mobile() ? "0px" : "50px", paddingRight: mobile() ? "0px" : "50px", width: "100%", }}>
                    <Menu
                        style={{ margin: 0, paddingInlineStart: 0 }}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['0']}
                        items={new Array(4).fill(null).map((_, index) => ({
                            key: String(index + 1),
                            label: {
                                0: (<a onClick={() => { this.GotoPage('MainPage', this.state) }}>首页</a>),
                                1: (<a onClick={() => { this.GotoPage('Login', this.state) }}>用户</a>),
                                2: (this.state.userIdentity == "admin") ? adminFunctionMenu : ((this.state.userIdentity == "user") ? userFunctionMenu : staffFunctionMenu),
                                3: infoMenu,
                            }[index],
                        }))}
                    />
                </Header>
                <Layout style={{ overflowY: 'hidden' }}>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, marginBottom: 70 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>Login</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout style={{ overflowY: 'scroll', marginBottom: 100, height: '90%' }}>
                            <div className="site-layout-background" style={{ padding: 0, height: 'fit-content' }}>
                                {this.state.PageContent}

                            </div>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, left: 0, right: 0 }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>

            </Layout>

        )
    }
}
export default Home;