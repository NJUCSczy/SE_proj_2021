/**
 * 登录页
 */
 import React from 'react';
 // 页面布局组件
 import HomeLayout from '../layouts/HomeLayout';
 import FormItem from '../components/FormItem';
 // 引入 封装后的fetch工具类
 import { post } from '../utils/request';
 // 表单验证组件
 import formProvider from '../utils/formProvider';
 // 引入 prop-types
 import PropTypes from 'prop-types';

 import { useState } from 'react';
 var _ = require('lodash');

function Login() {
  const [formData, setFormData] = useState({})
  var [userInfo, setUserInfo] = useState({})

  const handleChange = (type, value) => {
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[type] = value
      return newFormData
    })
  }

  const handleLogin = () => {
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
      console.log(formData)
      if (res.status === 200) {
        alert("登录成功！")
      }
      return res.json()
    })
    .then(data => {
      if (data.accessToken === undefined) {
       alert("登录失败！")
      }
      else {
        handleChange('Authorization', data.accessToken)
      }
      console.log(data)
    })
  }

  //  render () {
  //   var headImg={
  //     //top:"0%",
  //     //marginTop:"0px",
  //     //marginBottom:"44px",
  //     width:'200px',
  //     height:'200px',
  //     left:'50%',
  //     marginLeft:'-100px',
  //     position:'relative',
  //     //left:"50%",
  //     //marginLeft:"-56px"
  //     //textAlign:"center"不识别
  // }
  // var telInput={
  //   height:"25px",
  //   width:"200px",
  //   marginTop:"20px",
  //   marginLeft:"14px",
  //   border:"0.15rem solid",//默认框
  // }


  // var login={
  //   width:"150px",
  //   height:"42px",
  //   backgroundColor:"rgb(72, 39, 124)",
  //   color:"rgb(213, 205, 226)",
  //   fontSize:"18px",
  //   position:'relative',
  //   //left:"50%",
  //   //marginLeft:'-100px',
  //   marginTop:'10px',
  //   textAlign:'center',

  // }
  //    const {form: {account, password}, onFormChange} = this.props;
     return (
       <div style={{backgroundImage:"url(" + require("./images/back.jpg") + ")",backgroundSize:'100%'}} >
          <HomeLayout title="用户登录">
            <img src={require('./images/head.jpg')} style={{width:'200px',
              height:'200px',
              left:'50%',
              marginLeft:'-100px',
              position:'relative'}}/>
            <FormItem>
              <input type="text" placeholder="请输入邮箱"
               style={{ height:"25px",
               width:"200px",
               marginTop:"20px",
               marginLeft:"14px",
               border:"0.15rem solid"}}
               onChange={(e) => {handleChange("email", e.target.value)}}/>
            </FormItem>
            <br/>
            <FormItem>
              <input type="password" placeholder="请输入密码"
              style={{ height:"25px",
              width:"200px",
              marginTop:"20px",
              marginLeft:"14px",
              border:"0.15rem solid"}}
              onChange={(e) => {handleChange("password", e.target.value)}}/>
            </FormItem>
            <br/>
            <br/>
            <br/>
            <br/>
            <FormItem><button onClick={handleLogin} style={{textAlign:'center'}} >登录</button>{" "}</FormItem>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </HomeLayout>
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