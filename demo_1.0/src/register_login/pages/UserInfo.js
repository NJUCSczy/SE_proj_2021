import React, { Component } from 'react'
import { Button } from 'antd';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
}
const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //   getItem('Option 5', '5'),
    //   getItem('Option 6', '6'),
    //   getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    // ]),
    // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    //   getItem('Option 9', '9'),
    //   getItem('Option 10', '10'),
    //   getItem('Option 11', '11'),
    //   getItem('Option 12', '12'),
    // ]),
  ];
class UserInfoPage extends Component{

    constructor(props) {
        super(props);
        const {_state} = props;
        this.state=_state;
    }
    Logout = () => {
        var emptyUserInfo={userID:null,userName:null,Authorization:null};
        this.props.UpdateUserInfo(emptyUserInfo);
        this.props.GotoPage('Login',emptyUserInfo);
    }
    render(){
        const onClick = (e) => {
            console.log('click ', e);
          };
        return (
            <div className="container">
            <h1 style={{fontSize: 40, fontWeight: 'bolder', textAlign: 'center'}}>用户信息</h1>
            <h2>用户名: {this.state.userName}</h2>
            <h2>用户身份: {(this.state.userIdentity === 'user') ? '普通用户' : ((this.state.userIdentity === 'admin') ? '管理员' : '工作人员')}</h2>
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                
                // items={this.handleLogin}
                items={items}
            />
            <div style={{textAlign: 'center'}}><Button type="primary" size='large' onClick={this.Logout}>退出登录</Button></div>
            </div>
        )
    }
}

export default UserInfoPage