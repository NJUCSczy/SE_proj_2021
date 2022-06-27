import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Card, Button, Row, Space,message } from 'antd';
import './Login.css'
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../UserActions/functions/functions';

var _ = require('lodash');

/**
 * 用户登录的界面，采用自适应布局，包含卡片，按钮，输入框等多种表单组件
 * 
 * 在用户填写邮箱，账号和密码之后可以点击登录，提交的数据会发送给后端进行核验
 * 
 * 用户点击立即注册可以转到注册界面
 * 
 */

function LoginPage(props) {
  const { _state, UpdateUserInfo, GotoPage } = props;

  const [formData, setFormData] = useState({})
  var [userInfo, setUserInfo] = useState({})
  //const navigate = useNavigate();

  const handleChange = (type, value) => {
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[type] = value
      return newFormData
    })
  }

  const handleLogin = () => {
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': formData['email'],
          "password": formData['password']
        })
      })
        .then(res => {
          if (res.status === 200) {
            message.success({content:'登录成功！',key:"login",duration:2})
          }else{
            message.error({content:'登录失败',key:"login",duration:2})
          }

          return res.json()
        })
        .then(data => {
          console.log(data)
          if (data.accessToken != undefined) {
            handleChange('accessToken', data.accessToken)
            var _info = { userRole: ['ROLE_USER'], userID: data.user.id, userName: data.user.username, accessToken: data.accessToken };
            UpdateUserInfo(_info, GotoPage('UserInfo', _info));
          }
        })
    }
    else {
      fetch(REMOTE_SERVER+"/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          'username': formData['username'],
          "password": formData['password']
        })
      })
        .then(res => {
          if (res.status === 200) {
            message.success({content:'登录成功！',key:"login"})
          }else{
            message.error({content:'登录失败',key:"login"})
          }
          return res.json()
        })
        .then(data => {
          console.log(data)
          if (data.accessToken != undefined) {
            handleChange('accessToken', data['accessToken'])
            var _info = { userRole: data['roles'], userID: data['id'], userName: data['username'], accessToken: data['accessToken'],tokenType:data['tokenType'] };
            UpdateUserInfo(_info, GotoPage('UserInfo', _info));
          }
        })
    }
  }

  const changePassword = () => {}

  return (
    <div className="App" style={{ float: "center" }} >
      <Row justify="center" align="middle" className="register_ground" style={{ backgroundImage: "url(" + require("../images/westWorld1.jpeg") + ")" }}>
        <Card justify="center" title="用户登录" className="register_card">
          <br />
          <Input id="login_input_email" placeholder="请输入邮箱" className="register_email"
            onChange={(e) => { handleChange("email", e.target.value) }} />
          <br />
          <br />
          <Input id="login_input_username" placeholder="请输入账号" className="register_username"
            onChange={(e) => { handleChange("username", e.target.value) }} />
          <br />
          <br />
          <Input.Password id="login_input_password" className="register_password" placeholder="请输入密码"
            onChange={(e) => { handleChange("password", e.target.value) }} />
          <br />
          <br />
          <Button id="login_button" className="register_btn" onClick={handleLogin}>登录</Button>{" "}
          <Button id = "changepw_button" className="register_btn" onClick={() => changePassword}>忘记密码</Button>{" "}
          <Button id="goto_register_button" onClick={() => { GotoPage('Register') }} className="register_btn" > 立即注册</Button>
        </Card>
      </Row>
    </div>
  );
}

export default LoginPage;
