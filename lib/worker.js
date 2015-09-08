var msgpack = require('msgpack5')() // namespace our extensions
  , encode  = msgpack.encode
  , decode  = msgpack.decode
  , zmq = require('zmq')
  , sock = zmq.socket('pull')
  , log4js = require('log4js')
  , logger = log4js.getLogger();

var Q = function (conf) {
  var name, ip, port;
  
  name = conf.name
  ip= conf.ip
  port= conf.port
  var connect = 'tcp://' + ip + ':' + port;
  sock.connect(connect);
  
  console.log('ZeroMQ ' + name + ' bound to ' + connect);
  return this;
};

Q.prototype.receive = function (cb) {
  sock.on('message', function(msg){
    logger.debug("Some debug messages" + msg);
    var o = decode(msg)
  
    var json = JSON.stringify(o);
    json = JSON.parse(json) 
    
    cb(json);  
  });
}

exports = module.exports = function (conf) {
  return new Q(conf);
};
  
  