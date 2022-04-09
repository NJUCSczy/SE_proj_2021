import React from'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
//import {hashHistory} from 'react-router';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import LoginPage from './pages/Login';
import UserEditPage from './pages/UserEdit'; // 用户编辑页面
class App extends React.Component{
    render(){
        return(
            //<Router history={hashHistory}>
            <Router>
                <Routes>
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

export default App;