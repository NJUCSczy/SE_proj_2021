import React from 'react'
import ReactDOM from 'react-dom';
import "./Home.css"
import { findDOMNode } from 'react-dom';
import SubmitApplication from './UserActions/actions/DelegationPart/SubmitApplication/SubmitApplication';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';

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
                </Routes>
        </Router>
        )
    }
}
export default All;