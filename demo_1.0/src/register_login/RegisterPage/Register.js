import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { Input, Card, Button, Row, Space,message } from 'antd';
import './Register.css';
import { USE_JSON_SERVER ,REMOTE_SERVER} from '../../UserActions/functions/functions';


var _ = require('lodash');

/**
 * 用户注册的界面，采用自适应布局，包含卡片，按钮，输入框等多种表单组件
 * 
 * 在用户填写邮箱，账号和密码之后可以点击注册，提交的数据会发送给后端进行数据存储
 * 
 * 用户点击立即登录可以转到登录界面
 * 
 */

function RegisterPage(props) {
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

  const handleRigister = () => {
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': formData['username'], "password": formData['password'], "email": formData['email'] })
      })
        .then(res => {
          console.log(formData)
          console.log(res)
          if (res.status === 201) {
            message.success({content:'注册成功！',key:"register"})
            GotoPage("Login")
          }else{
            message.error({content:'注册失败',key:"register"})
          }
          return (res.json())
        })
        .then(data => {
          console.log(data)
        })
    }
    else {
      fetch(REMOTE_SERVER+"/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "username": formData['username'], "password": formData['password'], "email": formData['email'] })
      })
        .then(res => {
          console.log(formData)
          if (res.status === 200) {
            message.success({content:'注册成功！',key:"register"})
            GotoPage("Login")
          }else{
            message.error({content:'注册失败',key:"register"})
          }
          return res.json()
        })
        .then(data => {
          console.log(data)
        })
    }
  }
  const changePassword = () => {}
  return (
    <div className="App" style={{ float: "center" }}>
      <Row justify="center" align="middle" className="register_ground" style={{ backgroundImage: "url(" + require("../images/westWorld1.jpeg") + ")" }}>
        <Card justify="center" title="用户注册" className="register_card">
          <br />
          <Input placeholder="请输入邮箱" className="register_email"
            onChange={(e) => { handleChange("email", e.target.value) }} />
          <br />
          <br />
          <Input placeholder="请输入账号" className="register_username"
            onChange={(e) => { handleChange("username", e.target.value) }} />
          <br />
          <br />
          <Input.Password className="register_password" placeholder="请输入密码"
            onChange={(e) => { handleChange("password", e.target.value) }} />
          <br />
          <br />
          <Button className="register_btn" onClick={handleRigister}>注册</Button>{" "}
          <Button id = "changepw_button" className="register_btn" onClick={() => changePassword}>忘记密码</Button>{" "}
          <Button onClick={() => { GotoPage('Login') }} className="register_btn" > 转到登录</Button>
        </Card>
      </Row>

      {/* {JSON.stringify(userInfo)} */}
    </div>
  );
}
export default RegisterPage;
