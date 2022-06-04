import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import FormItem from '../components/FormItem';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Card, Button, Row, Space,message } from 'antd';
import './css/register.css';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../UserActions/functions/functions';

var _ = require('lodash');

function Login(props) {
  const { UpdateUserInfo, GotoPage } = props;

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
            message.success({content:'登陆成功！',key:"login",duration:2})
          }else{
            message.error({content:'登陆失败',key:"login",duration:2})
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
            message.success({content:'登陆成功！',key:"login"})
          }else{
            message.error({content:'登陆失败',key:"login"})
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

  const updateInfo = () => {
    fetch("http://localhost:8000/users", {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + formData['Authorization']
      },
    })
      .then(res => {
        console.log("Bearer " + formData['authentication'])
        if (formData['Authorization'] == null) {
          alert("请先登录！")
          return null
        }
        else if (res.status === 201) {
          alert("读取成功！")
          //navigate('/')
        }
        return res.json()
      })
      .then(data => {
        if (data != null) {
          setUserInfo(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData["userInfo"] = data
            return newFormData
          })
        }
        console.log(data)
      })
  }

  return (
    <div className="App" style={{ float: "center" }} >
      <Row justify="center" align="middle" className="register_ground" style={{ backgroundImage: "url(" + require("./images/westWorld1.jpeg") + ")" }}>
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
          <Button className="register_btn" onClick={updateInfo}>查看</Button>{" "}
          <Button id="goto_register_button" onClick={() => { GotoPage('Register') }} className="register_btn" > 立即注册</Button>
        </Card>
      </Row>
    </div>
  );
}

//  Login.contextTypes = {
//    router: PropTypes.object.isRequired
//  };

//  Login = formProvider({
//    account: {
//      defaultValue: '',
//      rules: [
//        {
//          pattern (value) {
//            return value.length > 0;
//          },
//          error: '请输入账号'
//        }
//      ]
//    },
//    password: {
//      defaultValue: '',
//      rules: [
//        {
//          pattern (value) {
//            return value.length > 0;
//          },
//          error: '请输入密码'
//        }
//      ]
//    }
//  })(Login);


export default Login;
