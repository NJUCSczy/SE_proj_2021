import React from 'react'
import ReactDOM from 'react-dom';
import "./Home.css"
import { findDOMNode } from 'react-dom';
import SubmitApplication from './Adiministration/src/SubmitApplication/SubmitApplication';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import View from './register_login/View';
import UserAddPage from './register_login/pages/UserAdd';
import UserListPage from './register_login/pages/UserList';
import LoginPage from './register_login/pages/Login';
import RegisterPage from './register_login/pages/Register';
import UserEditPage from './register_login/pages/UserEdit'; // 用户编辑页面

class All extends React.Component{
    handle(){
        const w=window.open("","App/Administration")
        //console.log("'w' constructed!\n")
        ReactDOM.render(<SubmitApplication/>,w.document)
        //console.log("React!!")

    }
    render(){
        return(
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Route path="/user/add" element={<UserAddPage />} /> */}
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/user/list" element={<UserListPage />} />
                    <Route path="/user/edit/:id" element={<UserEditPage />} />
                    <Route path="/yjqtest" element={<View />} />
                </Routes>
        </Router>
        )
    }
}
export default All;