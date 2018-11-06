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
        service: 'magichomeled',
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
          max: 1
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

const queryState = () => {
  gladys.device.get({
    service: 'magichomeled'
  })
    .then(devices => {
      return Promise.map(devices, device => {
        const light = new magicHomeControl(device.identifier);
        light.queryState((err, deviceState) => {
          const state = {
            binary: deviceState.on,
            mode: 0,
            red: deviceState.color.red,
            green: deviceState.color.green,
            blue: deviceState.color.blue,
            warm_white: deviceState.warm_white
          };

          return Promise.each(Object.keys(state), key => {
            gladys.utils.sql('select * from devicetype where type=? and device=?', [key, device.id])
              .then((deviceType) => {
                gladys.deviceState.create({ devicetype: deviceType[0].id, value: state[key] });
              });
          });
        });
      });
    });
};

module.exports = {
  search,
  registerDevices,
  magicHomeControl,
  queryState
};
