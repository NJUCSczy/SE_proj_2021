import React from 'react';
import {Link} from 'react-router-dom';
// import {Segment} from 'semantic-ui-react';
// import "semantic-ui-css/semantic.min.css";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mytext:'',
        }
    }

    getData(){
        fetch('http://127.0.0.1:8081/json',{
            method:'GET'
        }).then(res=>res.json()).then(data=>{this.setState({mytext:data})})
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        return(
            <div>
                <div>This is home!</div>
                <div>{this.state.mytext.name}</div>
                <div>{this.state.mytext.price}</div>
                <div>{this.state.mytext.data}</div>
                <div><Link to="/Page1/" style={{color:'black'}}>
                    <div>点击跳转到Page1!</div>
                </Link></div>
            </div>
        )
    }
}
export default Login;