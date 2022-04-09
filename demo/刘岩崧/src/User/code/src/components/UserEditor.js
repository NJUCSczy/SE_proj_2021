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

 class UserEditor extends React.Component {
   // 按钮提交事件
   handleSubmit(e){
     // 阻止表单submit事件自动跳转页面的动作
     e.preventDefault();
     // 定义常量
     const { form: { name, gender,password }, formValid, editTarget} = this.props; // 组件传值
     // 验证
     if(!formValid){
       alert('请填写正确的信息后重试');
       return;
     }

     // 默认值
     let editType = '添加';
     let apiUrl = 'http://localhost:8000/user';
     let method = 'post';
     // 判断类型
     if(editTarget){
       editType = '编辑';
       apiUrl += '/' + editTarget.id;
       method = 'put';
     }

     // 发送请求
     request(method,apiUrl, {
       name: name.value,
       password: password.value,
       //age: age.value,
       //gender: gender.value
     })
     // 成功的回调
     .then((res) => {
       // 当添加成功时,返回的json对象中应包含一个有效的id字段
       // 所以可以使用res.id来判断添加是否成功
       if(res.id){
         alert(editType + '用户成功!');
         this.context.router.push('/user/list'); // 跳转失败
         return;
       }else{
         alert(editType + '用户失败!');
       }
     })
     // 失败的回调
     .catch((err) => console.error(err));
   }

   // 生命周期--组件加载中
   componentWillMount(){
     const {editTarget, setFormValues} = this.props;
     if(editTarget){
       setFormValues(editTarget);
     }
   }

   render() {
     // 定义常量
     var telInput={
      //margin:"0",
      //padding:"0",
      //display:"inline-block",
      height:"25px",
      width:"200px",
      marginTop:"20px",
      marginLeft:"14px",
      border:"0.15rem solid",//默认框
      //position:'absolute',
    }

    var login={
      //border:"none",
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
     const {form: {name,  password}, onFormChange} = this.props;
     return (
       <form onSubmit={(e) => this.handleSubmit(e)}>
         <FormItem valid={name.valid} error={name.error}>
           <input
             type="text" placeholder="请输入用户名"
             value={name.value} style={telInput}
             onChange={(e) => onFormChange('name', e.target.value)}/>
         </FormItem>
          <br/>
         <FormItem valid={password.valid} error={password.error}>
           <input
             type="password" placeholder="请输入密码"
             value={password.value} style={telInput}
             onChange={(e) => onFormChange('password', e.target.value)}/>
         </FormItem>
         <br/>
         <br/>
         <br />
         <div style={{textAlign:'center'}}>
           <input type="submit" value="提交" style={login}/>
          </div>

       </form>
     );
   }
 }

 // 必须给UserEditor定义一个包含router属性的contextTypes
 // 使得组件中可以通过this.context.router来使用React Router提供的方法
 UserEditor.contextTypes = {
   router: PropTypes.object.isRequired
 };

 // 实例化
 UserEditor = formProvider({ // field 对象
   // 姓名
   name: {
     defaultValue: '',
     rules: [
       {
         pattern: function (value) {
           return value.length > 0;
         },
         error: '请输入用户名'
       },
       {
         pattern: /^.{1,4}$/,
         error: '用户名最多4个字符'
       }
     ]
   },
   //密码
   password: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入密码'
      },
      {
        pattern: /^\w{6,20}$/,
        error: '密码为6-20位数字或字母或下划线!'
      }
    ]
  },
  //  // 年龄
  //  age: {
  //    defaultValue: 0,
  //    rules: [
  //      {
  //        pattern: function(value){
  //          return value >= 1 && value <= 100;
  //        },
  //        error: '请输入1~100的年龄'
  //      }
  //    ]
  //  },
  //  // 性别
  //  gender: {
  //    defaultValue: '',
  //    rules: [
  //      {
  //        pattern: function(value) {
  //          return !!value;
  //        },
  //        error: '请选择性别'
  //      }
  //    ]
  //  }
 })(UserEditor);

 export default UserEditor;