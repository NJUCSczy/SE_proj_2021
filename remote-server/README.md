# 启动远端服务器
首先我们目前用到的都已经部署好了，最后有[批处理文件](#批处理文件)可以一键运行，也可以自己看下面的步骤学习  
<center><h3>注意：必须连接校园网！</h3> </center>  
  
远端主机地址：210.28.133.13<br>
本组端口：21246（改过了，因为最开始的那个不小心被我搞炸了，老曹我们开了个新的）<br>
登录用户名：root<br>
密码：see2022<br>
<br>
登录命令：
```
ssh root@210.28.133.13 -p 21246  
```
在控制台执行此命令，并输入密码即可连接上远端服务器。
<br><br>
为了方便后续操作，这边推荐用以下指令启动，来将老曹的服务器端口映射到本地端口：
```
ssh root@210.28.133.13 -p 21246 -L 3000:127.0.0.1:8080 -L 8000:127.0.0.1:8000
```
在这里将远端的8080端口（网页的端口）映射到本地的3000端口（也可以自己改，只要不被占用就行），将远端的8000端口（json-server)映射到本地8000（这个不能改，因为我们目前网页中http请求都是发送到8000的，不进行相同映射的话会失败）。

# 远端服务器文件结构
    |——root（登录进去默认进入的目录）
        |——groupA
            |——build
                |——index.html
                |——...
            |——json-server
                |——db.json
目前没有clone我们的git项目，因为可以直接部署发布版。  
建议安装winscp用于快速通过ssh进行文件传输，下载地址：https://winscp.net/download/WinSCP-5.19.6-Setup.exe  
winscp登录配置：  
&emsp;&emsp;文件协议：SFTP  
&emsp;&emsp;主机名：210.28.133.13  
&emsp;&emsp;端口号：21246  
&emsp;&emsp;用户名：root  
&emsp;&emsp;密码：see2022  
<br>
我们目前文件都部署完毕，有兴趣可以下下来鼓捣下试试看。  

# 部署远端网站
在groupA文件夹下的build文件夹中，执行指令
```
http-server
```
便可以在localhost:8080端口部署index.html  
<br>
执行此命令后，即可在本机的localhost:3000（因为之前把远端的8080端口映射到本机的3000端口了）查看网站。

# 部署远端json-server
这个部分应该很快会被替换（后端大概也快整好了）
<br>  
目前json-server在远端服务器上处于持续运行的状态（没关掉）如果出现故障需要重新部署。  
<br>  
部署方法如下
```
screen -ls
```
此命令可以查看当前所有的控制台窗口，找到正在运行json-server的控制台窗口。  
以我此时的状态为例，返回的信息为：
```
root@ubuntu:~# screen -ls
There is a screen on:
        12056.json-server       (05/05/2022 06:47:21 AM)        (Detached)
1 Socket in /run/screen/S-root.
```
可以看到，目前pid为12056的窗口（名为json-server）正在运行。  
<br>
输入如下指令转到12056窗口（此处的参数根据实际情况而定）
```
screen -r 12056
```
跳转到运行json-server的窗口，可以看到json-server正在正常运行（或者出错）。 
<br>  
如果出现故障，则按ctrl+c强行停止，并且重新执行如下指令
```
json-server-auth db.json --port 8000 -r routes.json
```
然后按ctrl+a+d暂时退出此窗口（先按a再按d）  
这样就可以重新启动json-server服务器  
<br>
因为之前已经将远端的8000端口映射到本地的8000端口，所以在本机浏览器localhost:8000可以访问json-server，网站也可以正常使用json-server的功能。

关于screen的指令：
```
exit                //关闭当前控制台，建议采用此方法退出
screen -S xxxxx     //创建名为xxxxx的控制台窗口，用于并行运
screen -ls          //查看目前所有存在的控制台窗口以及其pid
screen -r [pid]     //根据pid重新连接控制台
```

# 批处理文件
__运行此目录下的[remote-start.vbs](remote-start.vbs)文件，即可连接远程服务器__  
<br>
网页映射端口：localhost:3000  
json-server映射端口：localhost:8000 
<br> <br> 
<center>
！！！！！！！！！！！！！！！！！！！！！！！！！！！<br>
！！！  特别注意：在运行vbs文件前切换到英文输入法！！！<br>
！！！！！！！！！！！！！！！！！！！！！！！！！！！<br>
（可以按win+空格来切换到英文输入法） 
</center>  
<br>
<br>
<center>
！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！<br>
！！！  特别注意：不要快速连续启动vbs文件！有啥问题联系我！！！<br>
！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！<br>
</center>
<br><br>
因为目前技术上的一些局限性，多方同时进行操作可能会引起冲突？还有待确定