import React from'react';

class View extends React.Component{

    render(){
        return(
            <div>
            <div>{this.props.text}</div>
            <div>Hello world!</div>
            </div>
        )
    }
}

export default View;

