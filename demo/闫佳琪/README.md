# 

[TOC]

## 3.27

##### 淘宝源也不是很好用所以用的南大镜像 多刷新几次

创建项目

```
$ npm install -g create-react-app
$ create-react-app my-app
$ cd my-app/
$ npm start
```

## 3.29

参考代码网址：`https://blog.csdn.net/gxf_ming/article/details/62046065`

初步完成了一个登录界面，长这样

![](https://github.com/halipai/MYIMAGES/raw/main/reactImages/image1.png)

和这样

![](https://github.com/halipai/MYIMAGES/raw/main/reactImages/image2.png)

缺点：

- 现在没有数据库，不能核对用户名和密码
- 按理说应该有一个验证码
- 现在只能在pc端甚至是本人一个人的电脑上界面看起来很正常，未能实现自适应的布局
- 注册页面没写
- 点击登录后用户名和密码不一致的触发事件没写
- 图片都是随便找的，大小很随意，根本对不齐，而且登录页面应该还有一个测试中心logo
- 没有实现cookie，记住手机号就是个摆设
- 还需要一些美化界面的技术，比如将文字写到正中间

## 4.4

学习了路由跳转，由于学习资料时间久远，与现有库的使用方式略有不同，花了好几个小时来看一些没用的东西。。

npx -p npm@6 npm i --legacy-peer-deps

npm install npm@6.x -g

react-router4中不支持直接从react-router中引用hashHistory等history对象。

解决：

1、降级

npm install react-router@3 --save

2、查阅react-router4的文档

npm install react-router-dom --save

import { hashHistory } from "react-router-dom"

当觉得怎么都不对的时候，终极大法：删除node_modules,然后npm cache clean -f 强制删除缓存,重新npm install 即可。

json-server db.json -w -p 8000

## 每周总结4.9

学习了路由跳转和使用组件来整理代码。

初步完成了注册和登录界面，并可以进行用户查询，增添和删除，和简单页面跳转。

参考`https://www.cnblogs.com/crazycode2/p/8462237.html`一系列代码

```
.
├── server
|    ├── auth.js
|    ├── db.json
|    ├── index.js
├── test1
|    ├── src
|    │    ├── components
|    │    │      ├── FormItem.js
|    │    │      ├── UserEditor.js
|    │    ├── layouts
|    │    │      ├── HomeLayouts.js
|    │    ├── pages
|    │    │      ├── Home.js
|    │    │      ├── Login.js
|    │    │      ├── UserAdd.js
|    │    │      ├── UserEdit.js
|    │    │      ├── UserList.js
|    │    ├── utils
|    │    │      ├── formProviders.js
|    │    │      ├── request.js
|    │    ├── App.js
|    │    ├── index.js
|    ├── jsconfig.json
|    ├── package-lock.json
|    ├── package.json
```

在`./server`下运行`json-server db.json -w -p 8000`可以运行`./server/db.json`

在`./test1`下运行`npm run start`或`npm start`可以运行`./test1/src/index.js`

