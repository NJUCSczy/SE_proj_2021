# 界面跳转
## 文件结构
总文件夹  
　　|——package.json  
　　|——public  
　　|——src  
　　　　|——Home.js //主界面  
　　　　|——Home.css  
　　　　|——index.js  
　　　　|——index.css  
　　　　|——register_login //用户登录注册部分  
　　　　　　|——components  
　　　　　　　　|——layouts  
　　　　　　　　|——pages  
　　　　　　　|——utils  
　　　　|——UserActions //用户功能界面  
　　　　　　|——actions  
　　　　　　|——DelegationPart //委托部分  
　　　　　　　　|——SubmitApplication.js  
　　　　　　　　|——...  
　　　　　　|——ContractPart //合同部分  
　　　　　　　　|——MktContract.js  
　　　　　　　　|——...  
　　　　　　|——TestPart //测试部分  
　　　　　　　　|——CheckList.js  
　　　　　　　　|——...  
　　　　　　|——ViewPart //回显部分  
　　　　　　　　|——ViewEntrustList.js  
　　　　　　　  |——ViewEntrust.js  
　　　　　　　  |——...  
　　　　|——functions  
　　　　　　|——function.js //部分函数  
　　　　|——...  
　　|——\_\_tests\_\_    //单元测试部分  
　　　　|——test_1.py  
　　　　|——...
## 操作方式
若未安装json-server,则执行如下指令
```
$ npm install -g json-server
```
若未安装react-router-dom，使用powershell执行如下指令
```
npm i -S react-router-dom
```
若未安装is-mobile，使用powershell执行如下指令
```
npm i is-mobile
```
运行start_server.bat启动本地模拟后端  
      
---

在此目录下执行以下指令打开网页
```
npm start
```
# 自动生成文档
若首次使用，则需要安装依赖  
若未安装webpack，使用powershell执行如下指令
```
npm install --save-dev webpack
```
若未安装Styleguidist，使用powershell执行如下指令
```
npm install --save-dev react-styleguidist
```
安装完成后，使用如下指令在线启动调试
```
npm run styleguide
```
调试过程中可以在6060端口(默认)查看文档
使用如下指令打包文档
```
npm run styleguide:build
```  
<br>  

__examples编写方法：__  
在相应的js文件夹同级目录下，创建同名的md文件  
(例如，在SubmitApplication.js同级目录下创建名为SubmitApplication.md文件)  
随后编写此md文件，即可进行样例展示。具体书写规范参考：[SubmitApplication.md](./src/UserActions/actions/DelegationPart/SubmitApplication/SubmitApplication.md) 

样例参考(后续会更新)  
[SubmitApplication.js](./src/UserActions/actions/DelegationPart/SubmitApplication/SubmitApplication.js)  
<br>
参考教程  
[react-styleguidist教程](https://react-styleguidist.js.org/docs/getting-started)  
<br>  


## TODO List
*  1、各自完成文档书写
*  2、继续后端对接
*  3、测试部分表单
*  4、单元测试
*  5、更多自动化脚本
*  6、继续美化


