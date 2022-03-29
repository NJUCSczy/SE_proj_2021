## 简介

复制了闫佳琪同学的登录界面，稍微进行了一些修改  
=====
修改内容如下：  

1、将本地端口改为3005（可以在package.json中查看，目的是防止与json-server冲突）  

2、修复了this.state没有正确储存号码和密码的问题  

3、增加了一个简易的json-server数据库，可以存储网页发送的信息


------

## 操作方式
启动模拟后端数据库(注：为了防止冲突，建议随便找个目录来放db.json，然后用同样的方法运行)

```
$ npm install -g json-server
$ cd ../json-server
$ json-server db.json
```
打开网页
```
$ cd my-app
$ npm install
$ npm start
```
在浏览器输入http://localhost:3000 以监控数据库  
   
此部分用以展示模拟后端数据库的读写方法，仅供参考（x）
