module.exports = function(sails) {
    
  const setup = require('./lib/setup.js');
  const exec = require('./lib/exec');
  
  return {
    setup,
    exec
  };
};
