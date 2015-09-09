# mqpush

## Install

    [sudo] npm install --save mqpush

## Usages

push

```
var conf = {
  type  : "push",
  name  : "producter",
  ip    : "127.0.0.1",
  port  : "3002"
}

var Q = require('mqpush')(conf);

var a = {
    "_id" : ("55dbd8d5a41a9b1e02f581c2"),
    "xbm_id" : 10458,
    "username" : "娇娇"
}

Q.send(a);
```

pull

```
var conf = {
  type  : "pull",
  name  : "producter",
  ip    : "127.0.0.1",
  port  : "3002"
}


var Q = require('mqpush')(conf);

Q.receive(function(json){
});
```

## 与moa-api集成

https://github.com/moajs/moa-api

编写项目根目录的init.js

```
/**
 * 从mq接收send信息，并持久化
 */ 
function _mq_send(){
  var mq_config   = require('./config/mq');
  var Q = require('mqpush')(mq_config.send_receive);
  
  Q.receive(function(json){
    console.log(json);
    // TODO:
    // 保存send信息
    // 保存日志（成功，失败，以及失败原因）
  });
}


function main(){
  _create_log_dir(log_path);
  
  _mq_send();
}

// 程序入口
main();
```

然后`npm start即`可

如果是push的情况，在具体的逻辑部分写就可以了