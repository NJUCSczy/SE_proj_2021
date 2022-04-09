import React from 'react';
import {Link} from 'react-router-dom';
class Home extends React.Component{
    render(){
        return(
            <div>
                <div style={{textAlign:'center'}}>
                    <h1>这里是南京大学测试中心！</h1>
                </div>
                <br/>
                <div style={{fontSize:"18px",textAlign:'center'}}><Link to="/login">用户登录</Link></div>
                <br/>
                <div style={{fontSize:"18px",textAlign:'center'}}><Link to="/user/add">添加用户</Link></div>
                <br/>
                <div style={{fontSize:"18px",textAlign:'center'}}><Link to="/user/list">用户列表</Link></div>
            </div>
        )
    }
}
export default Home;