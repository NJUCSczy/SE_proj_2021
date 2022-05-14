import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./Home.css";
import SubmitApplication from './Adiministration/src/SubmitApplication/SubmitApplication';
import ViewApplication from './Adiministration/ViewApplication/ViewApplication'
import { useState } from 'react';

import { Layout, Menu, Dropdown, Breadcrumb, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import UserInfoPage from './register_login/pages/UserInfo';
import Login from './register_login/pages/Login';
import RegisterPage from './register_login/pages/Register';
import ConfidentialAgreement from './Adiministration/src/ConfidentialAgreement/ConfidentialAgreement';
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
            Authorization: null,
            HeaderMenuIndex : '1',
            BreadcrumbByIndex:['0','0','0','0','0']
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
            case 'MainPage': 
                this.setState({HeaderMenuIndex:'1',BreadcrumbByIndex:['0','0','0','0','0']});
                return MainPage;
            case 'UserInfo': 
                this.setState({HeaderMenuIndex:'2',BreadcrumbByIndex:['首页','用户信息','0','0','0']});
                return (<UserInfoPage _state={_state} UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'Login': 
                this.setState({HeaderMenuIndex:'2',BreadcrumbByIndex:['首页','登录','0','0','0']});
                return (<Login UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'Register': 
                this.setState({HeaderMenuIndex:'2',BreadcrumbByIndex:['首页','注册','0','0','0']});
                return (<RegisterPage UpdateUserInfo={this.UpdateUserInfo} GotoPage={this.GotoPage} />);
            case 'SubmitApplication': 
                if(this.state.Authorization === null){
                    alert('请先登录！')
                    return this.GetPageInfo('Login',_state);
                }
                else{
                    this.setState({HeaderMenuIndex:'3',BreadcrumbByIndex:['首页','提交申请','0','0','0']});
                    return (<SubmitApplication _state={_state} GotoPage={this.GotoPage} />);
                }
            case 'ViewApplication': 
                this.setState({HeaderMenuIndex:'3',BreadcrumbByIndex:['首页','查看委托','0','0','0']});
                return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>查看委托</div>);
            case 'Info1' : 
                this.setState({HeaderMenuIndex:'4'});    
                return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>机构信息</div>);
            case 'Info2' :
                this.setState({HeaderMenuIndex:'4'});   
                return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>资质信息</div>);
            case 'Info3' : 
                this.setState({HeaderMenuIndex:'4'});   
                return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>政策法规</div>);
            case 'Info4' : 
                this.setState({HeaderMenuIndex:'4'});   
                return (<div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>业务信息</div>);
            case 'Info5' : 
                this.setState({HeaderMenuIndex:'4'});   
                return (<ViewApplication></ViewApplication>);
            case 'Info6' : 
                this.setState({HeaderMenuIndex:'4'});       
                return (<ConfidentialAgreement></ConfidentialAgreement>);
        }
        return null;
    }

    UpdateUserInfo = (info,callback=null) => {
        this.setState(info,callback);
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

        const Breadcrumbitems={
            0:null,
            "首页":<Breadcrumb.Item><a onClick={() => {this.GotoPage('MainPage',this.state)}}>首页</a></Breadcrumb.Item>,
            "用户信息":<Breadcrumb.Item><a onClick={() => {this.GotoPage('UserInfo',this.state)}}>用户信息</a></Breadcrumb.Item>,
            "登录":<Breadcrumb.Item><a onClick={() => {this.GotoPage('Login',this.state)}}>登录</a></Breadcrumb.Item>,
            "注册":<Breadcrumb.Item><a onClick={() => {this.GotoPage('Register',this.state)}}>注册</a></Breadcrumb.Item>,
            "提交申请":<Breadcrumb.Item><a onClick={() => {this.GotoPage('SubmitApplication',this.state)}}>提交申请</a></Breadcrumb.Item>,
            "查看委托":<Breadcrumb.Item><a onClick={() => {this.GotoPage('ViewApplication',this.state)}}>提交申请</a></Breadcrumb.Item>,
        };

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
                        defaultSelectedKeys={['1']}
                        selectedKeys={[this.state.HeaderMenuIndex]}
                        items={new Array(4).fill(null).map((_, index) => ({
                            key: String(index + 1),
                            label: {
                                0: (<a onClick={() => { this.GotoPage('MainPage', this.state) }}>首页</a>),
                                1: (<a onClick={() => {this.state.Authorization ===null ? this.GotoPage('Login', this.state) : this.GotoPage('UserInfo', this.state)}}>用户</a>),
                                2: (this.state.userIdentity == "admin") ? adminFunctionMenu : ((this.state.userIdentity == "user") ? userFunctionMenu : staffFunctionMenu),
                                3: infoMenu,
                            }[index],
                        }))}
                    />
                </Header>
                <Layout style={{ overflowY: 'hidden' }}>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, marginBottom: 70 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        {Breadcrumbitems[this.state.BreadcrumbByIndex[0]]}
                        {Breadcrumbitems[this.state.BreadcrumbByIndex[1]]}
                        {Breadcrumbitems[this.state.BreadcrumbByIndex[2]]}
                        {Breadcrumbitems[this.state.BreadcrumbByIndex[3]]}
                        {Breadcrumbitems[this.state.BreadcrumbByIndex[4]]}
                        </Breadcrumb>
                        <Layout style={{ overflowY: 'scroll', marginBottom: 100, height: '100%' }}>
                            <div className="site-layout-background" style={{ padding: 0, height: 'fit-content' }}>
                                {this.state.PageContent}
                            </div>
                        </Layout>
                    </Content>
                </Layout>
            </Layout>

        )
    }
}
export default Home;