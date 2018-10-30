var Promise = require('bluebird');
const {
  search,
  registerDevices
} = require('./magicHome');

module.exports = function() {
  // we search on the network for all bridges
  return search()
    .then(function(devices){
      // if we found wifi lights
      if(devices && devices.length === 0){
        return Promise.reject(new Error('No bridge found'));
      } else {
        return registerDevices(devices);
      }
    });
};
