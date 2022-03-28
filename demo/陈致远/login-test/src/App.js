import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

var _ = require('lodash');


function App() {
  const [formData, setFormData] = useState({})
  var [userInfo,setUserInfo] = useState({})

  const handleChange = (type, value) => {
    setFormData(prev => {
        const newFormData = _.cloneDeep(prev)
        newFormData[type] = value
        return newFormData
    })
  }

  const handleRigister=()=>{
    fetch("http://localhost:3000/userinfo", {
      method: "POST",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
      .then(res => {
          if(res.status===201){
              alert("提交成功！")
          }
          return res.json()
      })
      .then(data => {
          console.log(data)
      })
  }

  const updateInfo=()=>{
    fetch("http://localhost:3000/userinfo", {
      method: "GET",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
  })
      .then(res => {
          if(res.status===201){
              alert("读取成功！")
          }
          return res.json()
      })
      .then(data => {
        setUserInfo(prev => {
          const newFormData = _.cloneDeep(prev)
          newFormData["userInfo"]=data
          return newFormData
      })
        console.log(userInfo)
      })
  }

  return (
    <div className="App" style={{ float:"center" }}>
      <div>
      <label style={{ marginLeft: "10px" }} >账号</label>
        <input type="text" style={{ border: 'none', borderBottom: '1px solid black' }}
        onChange={(e) => {
        handleChange("username",e.target.value)
        }}
        >
        </input>
        </div>
        <div>
        <label style={{ marginLeft: "10px" }} >密码</label>
        <input type="text" style={{ border: 'none', borderBottom: '1px solid black' }}
        onChange={(e) => {
          handleChange("password",e.target.value)
        }}
        ></input>
        </div>
        <hr/>
        <button onClick={handleRigister}>注册</button>
        <button onClick={updateInfo}>查看</button>
        <hr/>
        {JSON.stringify(userInfo)}
    </div>
  );
}

export default App;
