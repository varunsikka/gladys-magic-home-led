const Promise = require('bluebird');
const {
  magicHomeControl
} = require('./magicHome');

module.exports = function exec(params){
  const light = new magicHomeControl(params.deviceType.identifier);

  switch(params.deviceType.type) {
  case 'binary':
    if(params.state.value === 1){
      newState = light.turnOn((err, success) => {
        if (err) {
          return Promise.reject(err);
        }

        return Promise.resolve(success);
      });
    } else {
      newState = light.turnOff((err, success) => {
        if (err) {
          return Promise.reject(err);
        }

        return Promise.resolve(success);
      });
    }
    break;

  case 'red':
    light.queryState((err, state) => {
      if (err) {
        return Promise.reject(err);
      }

      const {
        color: {
          green,
          blue
        }   
      } = state;

      light.setColor(params.state.value, green, blue, (err, success) => {
        if (err) {
          return Promise.reject(err);
        }
        return Promise.resolve(success);
      });
    });
    break;
  
  case 'green':
    light.queryState((err, state) => {
      if (err) {
        return Promise.reject(err);
      }

      const {
        color: {
          red,
          blue
        }   
      } = state;

      light.setColor(red, params.state.value, blue, (err, success) => {
        if (err) {
          return Promise.reject(err);
        }
        return Promise.resolve(success);
      });
    });
    break;

  case 'blue':
    light.queryState((err, state) => {
      if (err) {
        return Promise.reject(err);
      }

      const {
        color: {
          red,
          green
        }   
      } = state;

      light.setColor(red, green, params.state.value, (err, success) => {
        if (err) {
          return Promise.reject(err);
        }
        return Promise.resolve(success);
      });
    });
    break;
  };
};
