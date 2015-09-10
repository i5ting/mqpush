var msgpack = require('msgpack5')() // namespace our extensions
  , encode  = msgpack.encode
  , decode  = msgpack.decode
  , zmq = require('zmq')
  , sock = zmq.socket('push')
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

Q.prototype.send = function (obj) {
  var b = encode(obj)//.toString('hex');
  
  logger.debug("Some debug messages" + b);
  sock.send(b);
}

exports = module.exports = function (conf) {
  return new Q(conf);
};
  
  