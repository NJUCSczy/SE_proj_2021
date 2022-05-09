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

const MainPage = (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
    首页
</div>)


class Home extends React.Component {

    state = {
        PageContent: MainPage,
    };

    ReturnToMainPage = () => {
        this.setState({
            PageContent: MainPage
        })
    }


    GotoUserPage = () => {
        this.setState({
            PageContent: (<Login></Login>)
        })
    }

    render() {
        var mobile = require('is-mobile');



        const infoMenu = (
            <Menu
                mode="inline"
                items={[
                    {
                        label: (
                            <a >
                                机构信息
                            </a>
                        ),
                    },
                    {
                        label: (
                            <a>
                                资质信息
                            </a>
                        ),
                    },
                    {
                        label: (
                            <a>
                                政策法规
                            </a>
                        ),
                    },
                    {
                        label: (
                            <a>
                                业务信息
                            </a>
                        ),
                    },
                    {
                        label: (
                            <a>
                                新闻资讯
                            </a>
                        ),
                    },
                    {
                        label: (
                            <a>
                                友情链接
                            </a>
                        ),
                    },

                ]}
            />
        );
        return (


            <Layout>
                <Header style={{ position: "fixed", zIndex: 1, paddingLeft: mobile() ? "0px" : "50px", paddingRight: mobile() ? "0px" : "50px", width: "100%", }}>
                    <Menu
                        style={{ margin: 0, paddingInlineStart: 0 }}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['0']}
                        items={new Array(4).fill(null).map((_, index) => ({
                            key: String(index + 1),
                            label: {
                                0: (<a onClick={this.ReturnToMainPage}>首页</a>),
                                1: (<a onClick={this.GotoUserPage}>用户</a>),
                                2: (<a onClick={this.handle}>操作</a>),
                                3: (<Dropdown overlay={infoMenu} placement="bottomCenter">
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
                <Layout style={{ boxSizing: 'content-box' }}>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64,   }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>Login</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout style={{ overflowY: 'scroll' }}>
                            <div className="site-layout-background" style={{ padding: 0,  height:'fit-content' }}>
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