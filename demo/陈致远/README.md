## 模拟后端接口简介

安装json-server
```
$ npm install -g json-server
```
---
将json-sever文件夹中的db.json文件拷贝到任一本地目录下，并在此目录下运行如下命令：
```
$ json-server db.json --port 3005
```
此处的--port参数可自行更改，需注意不要与网页默认的端口3000冲突  

------
随后在浏览器中输入 http://localhost:3005/ 即可查看模拟后端的数据内容



## 操作方式
在需要进行读写操作的位置的render()函数中return之前，添加如下内容：  
```
//上传数据
const handleSubmit=()=>{
        //端口以自己json-server的为准
        fetch("http://localhost:3005/userinfo", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(xxx)//此处xxx替换为上传的数据，类型为字典
    })
    //后续部分可酌情修改
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

//进行读取操作
const getInfo=()=>{
    //端口以自己json-server的为准
    fetch("http://localhost:3005/userinfo", {
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
        //此处data即为读取到的数据，根据需要进行存储或其他操作
        this.setState({userInfo:data})
        console.log(data)
        })
    }
``` 
举例：设定一个按钮，当按下按钮时获取数据
```
<button onClick={getInfo}>获取信息</button>
```
-----
以上方法仅供参考，可根据实际情况变更
