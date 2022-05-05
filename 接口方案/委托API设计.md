创建委托
body：委托的json
返回：状态码；

```
POST /delegation

headers : {
    "token" : xxxx ,
}

body : {

}
```
获取委托
```
GET /delegation/{ID}

headers : {
    "userid" : xxxx ,
    "token" : xxxx ,
}
```
获取委托列表
```
GET /delegations/{UsrId}

headers : {
    "userid" : xxxx ,
    "token" : xxxx ,
}
body : {

}

```

修改委托

```
PUT /delegation/{ID}

headers : {
    "token" : xxxx ,
}

body : {

}
```

委托删除

```
DELETE /delegation/{ID}

headers : {
    "token" : xxxx ,
}
```

委托审核

//市场部工作人员审核

```
POST /delegation/{ID}/audit/{type}

headers : {
    "token" : xxxx ,
}

body:
{
	"result": ,
	"suggestion": ,
}
```









