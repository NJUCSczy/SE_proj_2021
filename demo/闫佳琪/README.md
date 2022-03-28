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
- 
------

## 3.27

##### 淘宝源也不是很好用所以用的南大镜像 多刷新几次

创建项目

```
$ npm install -g create-react-app
$ create-react-app my-app
$ cd my-app/
$ npm start
```
