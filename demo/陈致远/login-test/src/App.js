import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

var _ = require('lodash');


function App() {
  const [formData, setFormData] = useState({})
  var [userInfo, setUserInfo] = useState({})

  const handleChange = (type, value) => {
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[type] = value
      return newFormData
    })
  }

  const handleRigister = () => {
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'email': formData['email'], "password": formData['password'] })
    })
      .then(res => {
        console.log(formData)
        if (res.status === 201) {
          alert("登录成功！")
        }
        return res.json()
      })
      .then(data => {
        alert(JSON.stringify(data))
        console.log(data)
      })
  }

  const handleLogin = () => {
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': formData['email'],
        "password": formData['password']
      })
    })
      .then(res => {
        console.log(formData)
        if (res.status === 200) {
          alert("登陆成功！")
        }
        return res.json()
      })
      .then(data => {
        if (data.accessToken === undefined) {
          alert("登陆失败！")
        }
        else {
          handleChange('Authorization', data.accessToken)
        }
        console.log(data)
      })
  }

  const updateInfo = () => {
    fetch("http://localhost:8000/users", {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + formData['Authorization']
      },
    })
      .then(res => {
        console.log("Bearer " + formData['authentication'])
        if (formData['Authorization'] == null) {
          alert("请先登录！")
          return null
        }
        else if (res.status === 201) {
          alert("读取成功！")
        }
        return res.json()
      })
      .then(data => {
        if (data != null) {
          setUserInfo(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData["userInfo"] = data
            return newFormData
          })
        }
        console.log(data)
      })
  }

  return (
    <div className="App" style={{ float: "center" }}>
      <div>
        <label style={{ marginLeft: "10px" }} >邮箱</label>
        <input type="text" style={{ border: 'none', borderBottom: '1px solid black' }}
          onChange={(e) => {
            handleChange("email", e.target.value)
          }}
        >
        </input>
      </div>
      <div>
        <label style={{ marginLeft: "10px" }} >密码</label>
        <input type="text" style={{ border: 'none', borderBottom: '1px solid black' }}
          onChange={(e) => {
            handleChange("password", e.target.value)
          }}
        ></input>
      </div>
      <hr />
      <button onClick={handleLogin}>登录</button>
      <button onClick={handleRigister}>注册</button>
      <button onClick={updateInfo}>查看</button>
      <hr />
      {JSON.stringify(userInfo)}
    </div>
  );
}

export default App;
