import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./Home.css";
import Administration from "./Adiministration/Administration"
import { useState } from 'react';

import { Layout, Menu, Dropdown, Breadcrumb, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import Login from './register_login/pages/Login';
const { Header, Content, Footer, Sider } = Layout;

const MainPage = (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>首页</div>)

const infoPages = [
    (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>机构信息</div>),
    (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>资质信息</div>),
    (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>政策法规</div>),
    (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>业务信息</div>),
    (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>新闻资讯</div>),
    (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>联系我们</div>),
]

const fuctionPages = [
    (<Administration />)
]


class Home extends React.Component {

    state = {
        PageContent: MainPage,
    };

    GoToMainPage = () => {
        this.setState({
            PageContent: MainPage
        })
    }


    GotoUserPage = () => {
        this.setState({
            PageContent: (<Login />)
        })
    }

    GotoInfoPage = (index) => {
        this.setState({
            PageContent: infoPages[index]
        })
    }

    GotoFunctionPage = (index) => {
        this.setState({
            PageContent: fuctionPages[index]
        })
    }

    render() {
        var mobile = require('is-mobile');


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
                                0: (<a onClick={() => { this.GoToMainPage() }}>首页</a>),
                                1: (<a onClick={() => { this.GotoUserPage() }}>用户</a>),
                                2: (<a onClick={() => { this.GotoFunctionPage(0) }}>操作</a>),
                                3: (<Dropdown overlay={<Menu
                                    items={[
                                        { label: (<a onClick={() => { this.GotoInfoPage(0) }}>机构信息</a>), },
                                        { label: (<a onClick={() => { this.GotoInfoPage(1) }}>资质信息</a>), },
                                        { label: (<a onClick={() => { this.GotoInfoPage(2) }}>政策法规</a>), },
                                        { label: (<a onClick={() => { this.GotoInfoPage(3) }}>业务信息</a>), },
                                        { label: (<a onClick={() => { this.GotoInfoPage(4) }}>新闻资讯</a>), },
                                        { label: (<a onClick={() => { this.GotoInfoPage(5) }}>友情链接</a>), },
                                    ]} />} placement="bottom">
                                    <a onClick={e => e.preventDefault()}>
                                        <Space>
                                            信息
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>)
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