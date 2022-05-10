import React, { Component } from 'react'
import { Button } from 'antd';

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
        return (
            <div className="container">
            <h1 style={{fontSize: 40, fontWeight: 'bolder', textAlign: 'center'}}>用户信息</h1>
            <h2>用户名: {this.state.userName}</h2>
            <h2>用户身份: {(this.state.userIdentity === 'user') ? '普通用户' : ((this.state.userIdentity === 'admin') ? '管理员' : '工作人员')}</h2>
            <div style={{textAlign: 'center'}}><Button type="primary" size='large' onClick={this.Logout}>退出登录</Button></div>
            </div>
        )
    }
}

export default UserInfoPage