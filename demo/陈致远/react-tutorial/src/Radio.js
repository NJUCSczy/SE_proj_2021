import React, { Component } from 'react';

class Radio extends Component {
    render() {
        const {TitleStyle,RadioStyle,TitleInfo,RadioInfo,Name}=this.props
        const rows = RadioInfo.map((row,index) => {
            return (
                <div key={index}>
                <label row={row} style={RadioStyle}> <input type="radio" name={Name} value={index}
                onChange={this.handleChange}/>{row.info}</label>
                </div>
            )
          })
        
          return <div>
              <div style={TitleStyle}>{TitleInfo}</div>
              {rows}
              </div>
    }
}
export default Radio;
