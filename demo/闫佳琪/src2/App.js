import React from'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import All2 from './All2';
import Home from './home';
import { createBrowserHistory } from "history";
class App extends React.Component{
    render(){
        return(
            <Router history={createBrowserHistory()}>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        )
    }
}

export default App;