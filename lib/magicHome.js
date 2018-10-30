const Promise = require('bluebird');
const {
  Control: magicHomeControl,
  Discovery: magicHomeDiscovery
} = require('magic-home');

const search = () => {
  const discover = new magicHomeDiscovery();
  return discover
    .scan(500)
    .then(devices => {
      return devices;
    });
};

const registerDevices = devices => {
  Promise.map(devices, device => {
    const deviceObj = {
      device: {
        name: `MagicHome LED Strip - ${device.model}`,
        protocol: 'wifi',
        service: 'magic-home-led',
        identifier: device.address
      },
      types: [
        {
          type: 'binary',
          sensor: false,
          tag: device.model,
          category: 'light',
          min: 0,
          max: 1
        },
        {
          type: 'mode',
          sensor: false,
          category: 'light',
          min: 0,
          max: 255
        },
        {
          type: 'red',
          sensor: false,
          category: 'light',
          min: 0,
          max: 255
        },
        {
          type: 'green',
          sensor: false,
          category: 'light',
          min: 0,
          max: 255
        },
        {
          type: 'blue',
          sensor: false,
          category: 'light',
          min: 0,
          max: 255
        },
        {
          type: 'warm_white',
          sensor: false,
          category: 'light',
          min: 0,
          max: 1
        }
      ]
    };
  
    return gladys.device.create(deviceObj);
  });
};

module.exports = {
  search,
  registerDevices,
  magicHomeControl
};
