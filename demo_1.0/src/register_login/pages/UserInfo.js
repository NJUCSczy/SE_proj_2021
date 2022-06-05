import React, { Component } from 'react'
import { Button } from 'antd';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER } from '../../UserActions/functions/functions';


function UserInfoPage(props) {
  const { _state, UpdateUserInfo, GotoPage } = props;
  const Logout = () => {
    var emptyUserInfo = { userID: null, userName: null, accessToken: null };
    UpdateUserInfo(emptyUserInfo);
    GotoPage('Login', emptyUserInfo);
  }
  return (
    <div className="container" style={{paddingLeft:20}}>
      <h1 style={{ fontSize: 40, fontWeight: 'bolder', textAlign: 'center' }}>用户信息</h1>
      <h2>用户名: {_state.userName}</h2>
      <h2>用户身份: {(() => {
        switch (_state.userRole[0]){
          case 'ROLE_ADMIN':return '管理员'
          case 'ROLE_USER':return '普通用户'
          case 'ROLE_MODMARKET':return '市场部人员'
          case 'ROLE_MODTEST':return '测试部人员'
          case 'ROLE_MODQLTY':return '质检部人员'
        }})()}</h2>
      {(_state.userRole[0] === 'ROLE_ADMIN') ? <div style={{ textAlign: 'center',marginTop:20 }}><Button type="primary" size='large' onClick={() => GotoPage("RegisterStaff",_state)}>注册工作人员</Button></div> : null}
      <div style={{ textAlign: 'center',marginTop:20 }}><Button id='logout' type="primary" size='large' onClick={Logout}>退出登录</Button></div>
    </div>
  )
}

export default UserInfoPage