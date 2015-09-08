exports = module.exports = function (conf) {
  if (conf.type === 'push') {
    var Q = require('./lib/producer');
    return new Q(conf);
  }else{
    var Q = require('./lib/worker');
    return new Q(conf);
  }
};