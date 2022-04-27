/**
 * 用户编辑器组件
 */
import React from 'react';
import FormItem from '../components/FormItem'; // 或写成 ./FormItem
 // 高阶组件 formProvider表单验证
import formProvider from '../utils/formProvider';
 // 引入 prop-types
import PropTypes from 'prop-types';
 // 引入 封装fetch工具类
 import request from '../utils/request';
 import {useNavigate} from "react-router-dom";
import { useState } from 'react';
var _ = require('lodash');

function UserEditor() {
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
      body: JSON.stringify({ 'email': formData['email'], "password": formData['password'] })
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
        alert(JSON.stringify(data))
        console.log(data)
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
      <FormItem >
        <label >邮箱</label>
        <input type="text" placeholder="请输入邮箱"
         style={{ height:"25px",
         width:"200px",
         marginTop:"20px",
         marginLeft:"14px",
         border:"0.15rem solid"}}
         onChange={(e) => {handleChange("email", e.target.value)}}>
        </input>
      </FormItem>
      <FormItem >
        <label  >密码</label>
        <input type="password" placeholder="请输入密码"
         style={{ height:"25px",
         width:"200px",
         marginTop:"20px",
         marginLeft:"14px",
         border:"0.15rem solid"}}
         onChange={(e) => {handleChange("password", e.target.value)}}></input>
      </FormItem>
      <br />
      <FormItem>
      <button onClick={handleRigister}>注册</button>{" "}
      <button onClick={updateInfo}>查看</button>
      </FormItem>

      <br />
      {JSON.stringify(userInfo)}
    </div>
  );
}

 export default UserEditor;