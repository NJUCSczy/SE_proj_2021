import React from 'react';

class FormItem extends React.Component {
  render () {
    var userTel={
      margin:"0 auto",
      padding:"0",
      display:'block',
      height:"50px",
      width:"500px",
      left:"50%",
      //marginLeft:"150px",
      //borderBottom:"1px solid #989898",
      lineHeight:"52px",
      paddingTop:"20px",
      textDecoration:"none",//去掉下划线
      textAlign:'center',

  }
    const {label, children, valid, error} = this.props;
    return (
      <div style ={userTel}>
        <div>{label}</div>
        {children}
        <div>{!valid && <span style={{fontSize:"13px"}}>{error}</span>}</div>
      </div>
    );
  }
}

export default FormItem;