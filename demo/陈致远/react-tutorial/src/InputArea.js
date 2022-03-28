import React, {Component} from 'react'
import { SIZE } from 'rsuite/esm/utils';
class InputArea extends Component{
    render(){
        const {TitleStyle,InputStyle,TitleInfo,TitleIdentifier,Width=-1,Height=-1,maxLength=-1} = this.props
        return (
        <div style={{justifyContent:"center"}}>
            <form>
            <label htmlFor="name" style={TitleStyle}>{TitleInfo}</label>
            <br />
            <input
            style={Object.assign({width:Width,height:Height,textAlign:"left",justifyContent: "center" },InputStyle)}
            type="text"
            maxLength={maxLength}
            />
        </form>
        <br/>
      </div>
        )
    }
}
export default InputArea;