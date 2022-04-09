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


 class Login extends React.Component {
   // 构造器
   constructor () {
     super();
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit (e) {
     e.preventDefault();

     const {formValid, form: {account, password}} = this.props;
     if (!formValid) {
       alert('请输入账号或密码');
       return;
     }

     post('http://localhost:8000/login', {
       account: account.value,
       password: password.value
     })
       .then((res) => {
         if (res) {
           //this.context.router.push('/');//跳转失败
         } else {
           alert('登录失败，账号或密码错误');
         }
       })
   }

   render () {
    var headImg={
      //top:"0%",
      //marginTop:"0px",
      //marginBottom:"44px",
      width:'200px',
      height:'200px',
      left:'50%',
      marginLeft:'-100px',
      position:'relative',
      //left:"50%",
      //marginLeft:"-56px"
      //textAlign:"center"不识别
  }
  var telInput={
    height:"25px",
    width:"200px",
    marginTop:"20px",
    marginLeft:"14px",
    border:"0.15rem solid",//默认框
  }


  var login={
    width:"150px",
    height:"42px",
    backgroundColor:"rgb(72, 39, 124)",
    color:"rgb(213, 205, 226)",
    fontSize:"18px",
    position:'relative',
    //left:"50%",
    //marginLeft:'-100px',
    marginTop:'10px',
    textAlign:'center',

  }
     const {form: {account, password}, onFormChange} = this.props;
     return (
       <div style={{backgroundImage:"url(" + require("./images/back.jpg") + ")",backgroundSize:'100%'}} >
          <HomeLayout title="用户登录">
          <img src={require('./images/head.jpg')} style={headImg}/>
            <form onSubmit={this.handleSubmit}>
              <FormItem valid={account.valid} error={account.error}>
                <input type="text" placeholder="请输入用户名"
                value={account.value} style={telInput}
                onChange={e => onFormChange('account', e.target.value)}/>
              </FormItem>
              <br/>
              <FormItem valid={password.valid} error={password.error}>
                <input type="password" placeholder="请输入密码"
                value={password.value} style={telInput}
                onChange={e => onFormChange('password', e.target.value)}/>
              </FormItem>
              <br/>
              <br/>
              <br/>
              <br/>
              <div style={{textAlign:'center'}}>
           <input type="submit" value="登录" style={login}/>
          </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </form>
          </HomeLayout>
       </div>
     );
   }
 }

 Login.contextTypes = {
   router: PropTypes.object.isRequired
 };

 Login = formProvider({
   account: {
     defaultValue: '',
     rules: [
       {
         pattern (value) {
           return value.length > 0;
         },
         error: '请输入账号'
       }
     ]
   },
   password: {
     defaultValue: '',
     rules: [
       {
         pattern (value) {
           return value.length > 0;
         },
         error: '请输入密码'
       }
     ]
   }
 })(Login);


 export default Login;