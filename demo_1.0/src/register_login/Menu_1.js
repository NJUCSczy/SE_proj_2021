import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import "../Home.css";
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
class Menu_1 extends React.Component  {
    render() {
        var mobile = require('is-mobile');
        const infoMenu = (
            <Menu
            mode="inline"
                items={[
                    {label: (<a>机构信息</a>),},
                    {label: (<a>资质信息</a>),},
                    {label: (<a>政策法规</a>),},
                    {label: (<a>业务信息</a>),},
                    {label: (<a>新闻资讯</a>),},
                    {label: (<a>友情链接</a>),},
                ]}
            />
        );
     return (
        <Header style={{ position: "fixed", zIndex: 1, paddingLeft:mobile()?"0px":"50px",paddingRight:mobile()?"0px":"50px",width:"100%",}}>
        <Menu
        style={{margin:0,paddingInlineStart:0}}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['0']}
        items={new Array(4).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: {
                0: (<Link to="/">首页</Link>),
                1: (<Link to="/login">登录</Link>),
                2: "操作",
                3: (<Dropdown overlay={infoMenu} placement="bottomCenter">
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            信息
                        </Space>
                    </a>
                </Dropdown>)
            }[index],
        }))}
    />
    </Header>
     );
    }
}

 export default Menu_1;