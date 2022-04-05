const cors = require('cors');
const http = require('http');
var express = require('express');
var app = express();
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(request,response)=>{
	const students = [
		{id:'001',name:'tom',age:18},
		{id:'002',name:'jerry',age:19},
		{id:'003',name:'tony',age:120},
	]
	response.send(students)
})


app.post('/password',function(req,res){
    let data = req.body;
    console.log(data);
    let message1 = {success:true}
    let message2 = {success:false}
    if(data.user==='1' && data.password==='2'){
        res.send(message1);
    }else res.send(message2);
})



var server = app.listen(8085, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})



