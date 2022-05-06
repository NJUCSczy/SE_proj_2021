import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./Home.css";
import Administration from "./Adiministration/Administration"

import { Layout, Menu, Dropdown, Breadcrumb,Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


class Home extends React.Component {
    handle() {
        const w = window.open("", "App/Administration")
        //console.log("'w' constructed!\n")
        ReactDOM.render(<Administration />, w.document)
        //console.log("React!!")
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
            /*
            <div>
                <div id="container">
                    <div id="header">
                        <div id="title"><span>南京大学软件测试中心</span></div>
                        <div id="login_or_register">
                            <Link to="/login">登录</Link> | <Link to="/user/add">注册</Link>
                        </div>
                    </div>
                    <div id="footer">
                        <ul>
                            <li><a href="#">首页</a></li>
                            <li><a href="#">机构信息</a></li>
                            <li><a href="#">资质信息</a></li>
                            <li><a href="#">政策法规</a></li>
                            <li><a href="#">业务信息</a></li>
                            <li><a href="#">新闻资讯</a></li>
                            <li><a href="#">友情链接</a></li>
                            <li><button onClick={this.handle}>提交申请</button></li>
                            <li><a href="#">联系我们</a></li>
                        </ul>
                    </div>
                    <div class="nav"></div>
                    <div id="main">
                        <div id="left">maybe some photos...</div>
                        <div id="vertical_nav"></div>
                        <div id="right">
                            <div id="article_one" class="right_article">
                                <span><a href="#" target="_blank">公告一</a></span>
                            </div>
                            <div class="article_nav"></div>
                            <div id="article_two" class="right_article">
                            <span><a href="#">公告二</a></span>
                            </div>
                            <div class="article_nav"></div>
                            <div id="article_three" class="right_article">
                                <span><a href="#">公告三</a></span>
                            </div>
                            <div class="article_nav"></div>
                            <div id="article_four"class="right_article">
                                <span><a href="#">公告四</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            */

            <Layout>
                <Header style={{ position: "fixed", zIndex: 1, paddingLeft:mobile()?"0px":"50px",paddingRight:mobile()?"0px":"50px",width:"100%",}}>
                    <Menu
                        style={{margin:0,paddingInlineStart:0}}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['0']}
                        items={new Array(4).fill(null).map((_, index) => ({
                            key: String(index + 1),
                            label: {
                                0: "首页",
                                1: (<Link to="/login">登录</Link>),
                                2: "操作",
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
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        Content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>

        )
    }
}
export default Home;