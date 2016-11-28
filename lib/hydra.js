const _ = require('lodash');

const cleanup = function(data) {
  if (_.isArray(data)) {
    return _.map(data, cleanup);
  } else if (_.isNull(data)) {
    return {};
  } else if (_.isEmpty(data)) {
    return {};
  } else if (_.isObject(data)) {

    // get every key
    const keys = _.keys(data || {});

    // create a copy
    var cleanedObject = _.assign({}, data);

    for (var key of keys) {
      if (!cleanedObject.hasOwnProperty(key)) {
        continue;
      }

      // remove @ from fields
      if (key.indexOf('@') === 0) {
        cleanedObject[key.substr(1)] = cleanedObject[key];
        delete cleanedObject[key];
        key = key.substr(1);
      }

      // remove hydra: from fields
      if (key.indexOf('hydra:') === 0) {
        cleanedObject[key.substr(6)] = cleanedObject[key];
        delete cleanedObject[key];
        key = key.substr(6);
      }

      if (_.isString(cleanedObject[key]) && _.startsWith(cleanedObject[key], 'hydra:')) {
        cleanedObject[key] = cleanedObject[key].substr(6);
      }

      // remove unused hydra stuff
      if (key === 'search' || key === 'context') {
        delete cleanedObject[key];
      }

      if (_.isArray(cleanedObject[key])) {
        cleanedObject[key] = _.map(cleanedObject[key], cleanup);
      } else if (_.isObject(cleanedObject[key])) {
        cleanedObject[key] = cleanup(cleanedObject[key]);
      }
    }

    return cleanedObject;
  } else {
    return {};
  }
}

module.exports = cleanup;
