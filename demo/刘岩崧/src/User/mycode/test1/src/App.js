import React from'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './Page1';
import { createHashHistory } from 'history';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import LoginPage from './pages/Login';
import UserEditPage from './pages/UserEdit'; // 用户编辑页面

const hashHistory = createHashHistory();
class UserApp extends React.Component{
    
    render(){
        return(
            <Router history={hashHistory}>
                <Routes>{/*气死我了*/}
                    <Route path="/Page1" element={<Page1 />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/user/add" element={<UserAddPage />} />
                    <Route path="/user/list" element={<UserListPage />} />
                    <Route path="/user/edit/:id" element={<UserEditPage />} />
                </Routes>
            </Router>
        )
    }
}

export default UserApp;