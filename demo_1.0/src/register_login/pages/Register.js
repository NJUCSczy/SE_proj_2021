import React from 'react';
import {useNavigate, Link} from "react-router-dom";
import { useState } from 'react';
import {Input,Card,Button,Row, Space } from 'antd';
import './css/register.css';


var _ = require('lodash');

function RegisterPage() {
    const [formData, setFormData] = useState({})
    var [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate();

    const handleChange = (type, value) => {
      setFormData(prev => {
        const newFormData = _.cloneDeep(prev)
        newFormData[type] = value
        return newFormData
      })
    }

    const handleRigister = () => {
      fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': formData['username'], "password": formData['password'],"email": formData['email'] })
      })
        .then(res => {
          console.log(formData)
          if (res.status === 201) {
            alert("注册成功！")
            navigate('/')
          }
          return res.json()
        })
        .then(data => {
          console.log(data)
          if(data["errorInfo"]!=undefined){
            alert(data["errorInfo"])
          }
        })
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
            navigate('/')
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
      <div className="App" style={{ float: "center" }}>
        <Row justify="center" align="middle" className="register_ground" style={{backgroundImage:"url(" + require("./images/westWorld1.jpeg") + ")"}}>
          <Card  justify="center"  title="用户注册" className="register_card">
          <br/>
            <Input placeholder="请输入邮箱" className="register_email"
                   onChange={(e) => {handleChange("email", e.target.value)}}/>
            <br/>
            <br/>
            <Input placeholder="请输入账号" className="register_username"
                   onChange={(e) => {handleChange("username", e.target.value)}}/>
            <br/>
            <br/>
            <Input.Password className="register_password" placeholder="请输入密码"
                            onChange={(e) => {handleChange("password", e.target.value)}}/>
            <br/>
            <br/>
            <Space size='large'>
              <Button className="register_btn" onClick={handleRigister}>注册</Button>
              <Button className="register_btn" onClick={updateInfo}>查看</Button>
              <Button href="/#/login" className="register_btn" > 转到登录</Button>
            </Space>
          </Card>
        </Row>
        {/* {JSON.stringify(userInfo)} */}
      </div>
    );
  }
export default RegisterPage;
