import React, { Component } from 'react'
import { Button, Divider, Space  } from 'antd';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER } from '../../UserActions/functions/functions';

/**
 * 查看用户信息的界面
 * 
 * 显示用户的身份信息
 * 
 * 如果用户是管理员，则其可以手动添加市场部人员，测试部人员和质检部人员
 */


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
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Divider />
      <br/>
      <div style={{ textAlign: 'center',marginTop:20 }}>
        <Space >
        {(_state.userRole[0] === 'ROLE_ADMIN') ? <div style={{ textAlign: 'center',marginTop:20 }}><Button type="primary" size='large' onClick={() => GotoPage("RegisterStaff",_state)}>注册工作人员</Button></div> : null}
      <div style={{ textAlign: 'center',marginTop:20 }}><Button id='changePassword' type="primary" size='large' onClick={() => GotoPage("ChangePassword",_state)}>修改密码</Button></div>
      <div style={{ textAlign: 'center',marginTop:20 }}><Button id='logout' type="primary" size='large' onClick={Logout}>退出登录</Button></div>
        </Space>
      </div>
      <br/>
      <br/>
      <Divider />
    </div>
  )
}

export default UserInfoPage