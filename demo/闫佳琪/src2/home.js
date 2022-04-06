import React from 'react';
import './All.css';
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';
import { createBrowserHistory } from 'history';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            password:'',
            get:'',
        }
    }

    userChange(e){
        this.setState({user: e.target.value})
    }
    passwordChange(e){
        this.setState({password:e.target.value})
    }

    submit(){
        this.getConnect();
    }


    getConnect(){
        var text = { "user":this.state.user, "password":this.state.password}
        let send = JSON.stringify(text);
        fetch('http://127.0.0.1:8085/password',{
            method:'POST',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
            body:send
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){this.context.router.push('/login')//这句话一直没找到能够实现的方法
            }else window.alert('失败')})
    }

    render(){
        return(
            <div>
                <Input id='user' placeholder='用户名' style={{marginBottom:'10px',width:'200px'}} onChange={this.userChange.bind(this)}/><br/>
                <Input id='password' type='password' placeholder='密码' style={{marginBottom:'10px',width:'200px'}} onChange={this.passwordChange.bind(this)}/><br/>
                <Button type="primary" style={{marginBottom:'10px'}} onClick={this.submit.bind(this)}>登录</Button>
                <div>{this.state.get}</div><br/>
                <div>{this.state.user}</div><br/>
                <div>{this.state.password}</div><br/>
            </div>
        )
    }
}
//<Input id='user' placeholder='用户名' style={{marginBottom:'10px'}} onChange={this.userChange.bind(this)}/><br/>
export default Home;