# 环境配置
若未安装json-server，输入如下命令安装：
```
npm install -g json-server
```
若未安装json-server-auth，输入如下命令安装
```
npm install -g json-server-auth
```
注意：这里的json-server-auth需要安装为全局(-g参数的作用)，否则无法正常使用
<br>  
<br>  
# json-server文件说明
json-server文件目录：[json-server文件夹(../json-server)](../json-server)
## db.json文件
此文件存储各类信息，根据其不同的读写权限分为若干个大类。分类设置由routes.json文件设定。  
另外，用户密码都是经过服务器自动加密的，直接查看看不懂。
## routes.json文件
设置db.json中不同信息的读写权限的配置文件  
<br>  

参数的三个数字分别代表拥有此文件的用户、登录的用户、未登录的用户的权限（0为无权限，4代表只读，6代表读写）   
<br>   
具体参数见下表：

| 参数 | 描述 |
| ------ | ------ | 
| 664 | 用户登录后可以写文件<br>所有人可以读文件 | 
| 660 | 用户登录后可以写文件<br>用户登录后可以读文件 | 
| 644 | 拥有此文件的用户可以写文件<br>所有人可以读文件 | 
| 640 | 拥有此文件的用户可以写文件<br>用户登录后可以读文件 | 
| 600 | 拥有此文件的用户可以写文件<br>拥有此文件的用户可以读文件 | 
| 444 | 没有人可以写文件（草）<br>所有人可以读文件 | 
| 444 | 没有人可以写文件<br>用户登录后可以读文件 | 
| 444 | 没有人可以写文件<br>拥有此文件的用户可以读文件 | 


<br>
例如：

```
{
  "users": 660,
  "messages": 640
}
```
代表"user"下的文件必须在登录后才可以读写，"message"下的文件表示必须登录才可以查看文件，且只有文件所有者才可以写文件。 
<br>   

在初期阶段可以稍微放宽权限方便测试
<br>  
<br>  
# 启动json-server
在json-server文件夹下运行：
```
json-server-auth db.json --port 8000 -r routes.json
```
或者直接运行此文件夹下的start_server.bat(可以视情况修改其中内容)
<br>  
<br>  
# 在js文件中使用登录认证功能
## 用户注册
以login-test项目中的handleRigister函数为例
```
const handleRigister=()=>{
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email':formData['email'],
      "password":formData['password']})
  })
      .then(res => {
        console.log(formData)
          if(res.status===201){
              alert("注册成功！")
          }
          return res.json()
      })
      .then(data => {
          alert(JSON.stringify(data))
          console.log(data)
      })
  }
```
### 说明：  
通过发送形如  
POST xxx/register  
POST xxx/signup  
POST xxx/users  
三者中任一种请求来进行注册操作，例如上述代码段中发送的请求为：  
```
POST  http://localhost:8000/register
{
    "email": "xxx@xxx",
    "password": "xxxxxx"
}
```
注意，此处的email和password是必须包含在内的，否则无法进行注册(封装如此，忍辱负重.jpg)。可以自由添加其他properties，也可以正常读取。  
另外，此处的email必须是xxx@xxx的格式，密码必须是六位以上。可能还有其他限制，也是封装的锅。如果输入格式有误，或是其他原因注册失败，在上述代码段最后返回的data中可以查看。  
<br>  
<br>  
## 用户登录
配合用户注册进行认证的登录功能。 
<br>   
以handleLogin函数为例
```
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
        if (data.accessToken == undefined) {
          alert("登陆失败！")
        }
        else {
          handleChange('Authorization', data.accessToken)
        }
        console.log(data)
      })
  }
```
### 说明：  
通过发送形如  
POST xxx/login  
POST xxx/signin  
二者中任一种请求来进行登录操作，发送的信息中仅需包括email和password。  
如果登陆成功，在回复信息的data中会包含accessToken，用于身份验证。如果登陆失败，报错信息也会在data中。  
<br>  
<br>  
## 读取数据
对于有权限的数据，用户需要进行认证才能进行读写操作。  
认证的方式，就是利用在登录步骤中获得的accessToken，在添加此token的情况下发送请求，即可声明自己的权限。
<br>  
以updateInfo函数为例
```
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
```
### 说明：
简单而言，就是在原先的GET方法的headers中增加Authorization，值为"Bearer xxx.xxx.xxx"。这里的xxx.xxx.xxx为登录步骤中获得的accessToken。  
同样的，如果请求失败，错误信息会在data中

<br>  
<br>  

# 原文地址：   
[https://www.npmjs.com/package/json-server-auth](https://www.npmjs.com/package/json-server-auth)  
有时候可能会鬼畜连不上（x）  
我写的这部分基本上是对这篇的简要概述和基础实现例子，他的文章最后还有一些拓展内容，如果有需要可以看看