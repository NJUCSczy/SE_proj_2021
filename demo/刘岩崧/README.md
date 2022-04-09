# 界面跳转
## 文件结构
总文件夹
|——package.json
|——public
|——src
    |——User //用户登录界面 
        |——mycode
        |——src
            |——User.js
            |——User.css
            |——...
    |——Adiministration //委托申请提交界面
        |——Administration.js
        |——Form.js
        |——Table2.js
        |——Table.js
    |——Home.js //主界面
    |——Home.css
    |——index.js
    |——index.css
    |——...
## 暂定逻辑
### 主界面定为信息网页，点击登录可跳转到用户登录界面，点击提交申请跳转到委托申请界面
## 修改声明
### 此部分对每人的代码修改尽力保持同风格不影响
## 具体修改list
### 为了统一设立程序对部分代码进行了重命名
/顾本龙——————>/Administration 对应用户提交申请委托部分
/尹凯————————>Home.js、Home.css 对应主界面
/闫佳琪——————>/User 对应用户登录部分
### 对主网页设为Home.js以达到和first.html同样效果
### 修改了Home.css一使得按钮风格符合原作者设计
### 对部分代码（Home.js、User.js...）添加了跳转按钮，由于提交申请部分为新创立独立网页，未设置返回部分
## TODO List
1、代码风格统合
2、用户登录确认（cookie部分）
3、网页信息与刷新