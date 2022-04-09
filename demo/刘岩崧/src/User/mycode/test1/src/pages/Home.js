import React from 'react';
import {Link} from 'react-router-dom';
class Home extends React.Component{
    render(){
        return(
            <div>
                <div>This is home!</div>
                <div>
                    <Link to="/Page1/" style={{color:'black'}}>
                        <div>点击跳转到Page1!</div>
                    </Link>
                </div>
                <div><Link to="/login">用户登录</Link></div>
                <div><Link to="/user/add">添加用户</Link></div>
                <div><Link to="/user/list">用户列表</Link></div>
            </div>
        )
    }
}
export default Home;