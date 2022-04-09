import React from 'react';
import './User.css';
import Home from "../../Home"
import ReactDOM from 'react-dom';
//ͷ头部
class Header extends React.Component {
    goBack (){
        window.history.go(-1);
    }
        render() {
             var styleDiv = {
                width:'100%',
                height:'70px',
               //lineHeight:'70px'
            }
            var styleImg = {
                width:'100%',
                height:'700px',
               //marginLeft:'10px',
               //marginRight:'10px'
            }

            return (
                <div style={styleDiv}>
                    <a href="#" onClick={()=>this.goBack()} >
                        <img src={require('./images/back.jpg')} style={styleImg}/>
                    </a>
                </div>
            )
        }
    }
   //中间表单
   class Content extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        telError:" ",
        passwordError:" ",
        imageShow:true,
        tel:"",
        password:" ",
        }

    }
    //手机号判断
    telCheck(event){
        this.tel=event.target.value
        console.log(this.tel)
        var reg=/^1[34578]\d{9}$/;
        if(reg.test(this.tel)==false){
            this.setState({
               telError:"请输入正确的手机号"
            })
        }else{
            this.setState({
                telError:" "
            })
        }

    }
    //密码判断
    passwordCheck(event){
        this.password=event.target.value
        var reg=/^\w{6,20}$/;
        if(reg.test(this.password)==false){
            this.setState({
                passwordError:"密码为6-20位数字或字母或下划线!"
            })
        }else{
            this.setState({
                passwordError:" "
            })
            }

    }
    //是否记住手机号
    isRemember(){
        this.setState({
            imageShow:!this.state.imageShow
        })
    }

    goToCheck(){
        if(null.test(this.tel)==false){
            this.setState({
                tel:""
            })
        }
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
    var ul={
        listStyle:"none",
        margin:"0",
        padding:"0",
        display:"block",
        paddingLeft:"50px",
        paddingRight:"50px",
    }
    var liAll={
        margin:"0 auto",
        padding:"0",
        display:'block',
        height:"20px",//<span>中为空格无法显示，所以将块元素设置固定宽高
    }
    var userTel={
        margin:"0 auto",
        padding:"0",
        display:'block',
        height:"50px",
        width:"286px",
        borderBottom:"1px solid #989898",
        lineHeight:"52px",
        paddingTop:"20px",

    }
    var userImg={
        diaplay:"inline-block",
        width:"30px",
        marginRight:"10px",
        top:"50%",
        marginTop:"15px",
    }
    var userSpan={
        display:"inline-block",
        border:"1px solid #989898",
        height:"30px",
        top:"50%",
        marginTop:"15px",
    }
    var telInput={
        //margin:"0",
        //padding:"0",
        //display:"inline-block",
        height:"25px",
        width:"200px",
        marginTop:"20px",
        marginLeft:"12px",
        border:"0.15rem solid",//默认框
        position:'absolute',
    }
    var telPrompt={
        color:"rgb(164, 88, 194)",
        fontSize:"18px",
        fontFamily: "monospace",
    }
    var buttonCheck={
        display:"inline-block",
        width:"20px",
        marginTop:"17px",
        //marginRight:"4px",
        left:"50%",
        position:'absolute',
        marginLeft:"-280px",
    }
    var rememberLi={
        display:"block",
        height:"48px",
        lineHeight:"48px",
        clear:"both",
        margin:"0 auto",
        left:"50%",
        marginTop:"10px",
    }
    var rememberI={
        fontSize:"18px",
        color:"rgb(104, 134, 76)",
        marginLeft:"-250px",
        fontFamily: "monospace",
        textDecoration:"none",//去掉下划线
        left:"50%",
        position:'absolute',
        fontWeight:"bold",
    }

    var forgetI={
        //float:"right",
        marginLeft:"180px",
        fontFamily: "monospace",
        fontSize:"18px",
        color:"rgb(104, 134, 76)",
        //marginBottom:"23px",
        textDecoration:"none",
        marginLeft:"160px",
        left:"50%",
        position:'absolute',
        fontWeight:"bold",
    }

    var login={
        //border:"none",
        width:"200px",
        height:"42px",
        backgroundColor:"rgb(72, 39, 124)",
        color:"rgb(213, 205, 226)",
        fontSize:"18px",
        position:'relative',
        left:"50%",
        marginLeft:'-100px',
        marginTop:'10px',

    }

    var loginIn={
        color:"rgb(213, 205, 226)",
        textDecoration:"none",
    }
    var backbutton={  
    width:"90px",
    height:"42px",
    backgroundColor:"rgb(158, 219, 217)",
    color:"black",
    position:'relative',
    left:"85%",
    borderBottom:"1px solid #989898",
    }
    return (
        <div id="Bodyparts">
        <div >
        <button  style= {backbutton}  onClick={()=>(ReactDOM.render(
            <React.StrictMode>
              <Home />
            </React.StrictMode>,
            document.getElementById('root')
           ))}>返回首页</button>
           {/* //设置返回按钮之后应当改为登录返回 */}
        </div>
        <div>
            <img src={require('./images/head.jpg')} alt="" style={headImg}/>
            <ul style={ul}>
                <li style={userTel}>
                    <img src={require('./images/username.jpg')} alt="" style={userImg}/>
                    <span style={userSpan}></span>
                    <input type="text" id="rcorners" style={telInput} placeholder="请输入手机号" onBlur={(event)=>this.telCheck(event)} />
                </li>
                <li style={liAll}>
                    <span style={telPrompt}>{this.state.telError}</span>
                </li>
                <li style={userTel}>
                    <img src={require('./images/password.jpg')} alt="" style={userImg}/>
                    <span style={userSpan}></span>
                    <input type="password" id="rcorners" style={telInput} placeholder="请输入密码" onBlur={(event)=>this.passwordCheck(event)}/></li>
                <li style={liAll}>
                    <span style={telPrompt}>{this.state.passwordError}</span>
                </li>
                <li style={rememberLi}>
                    <input type="checkbox" style={buttonCheck} value="first_checkbox" onClick={()=>this.isRemember()}/>
                    <strong href="#" style={rememberI}>记住手机号</strong>
                    <a href="#" style={forgetI}>忘记密码</a>
                </li>
                <li style={liAll}>
                    <button style={login} onClick={this.goToCheck}>
                        <a href="#" style={loginIn}>登录</a>
                    </button>
                </li>
            </ul>
        </div>
        </div>
    )
  }
}
  //底部
  class Footer extends React.Component{
  render(){
    var register={
        display:"block",
        fontSize:"23px",
        color:"#8b8b8b",
        width:"100px",
        height:"25px",
        margin:"0 auto",
        border:"1px solid #8b8b8b",
        textDecoration:"none",
        marginTop:"80px",
        textAlign:"center",
        lineHeight:"25px",

    }
    return(
    <a href="#" style={register}>快速注册</a>
    )
  }
  }
 
  class User extends React.Component{
    render () {
      return (
          <div id ="User">
              
              <Header></Header>
              <Content></Content>
              <Footer></Footer>
          </div>
      )
    }
  }

  export default User;