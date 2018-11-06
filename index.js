module.exports = function(sails) {
    
  const setup = require('./lib/setup.js');
  const exec = require('./lib/exec');
  const commands = require('./lib/commands');
  return {
    setup,
    exec,
    commands
  };
};
