const assert = require('assert');
const _ = require('lodash');
const should = require('chai').should();;
const hydra = require('../lib/hydra.js');

const data = {
  "@context": "/api/contexts/User",
  "@id": "/api/users",
  "@search": "xyz",
  "@type": "Users",
  "hydra:member": [
    {
      "@context": "/api/contexts/User",
      "@id": "/api/users/4fc62821-ab4b-11e6-b176-0258ac71fd57",
      "@type": "User",
      "birthdate": "1993-01-03T00:00:00+00:00",
      "city": null,
      "country": null,
      "displayName": "Thomas Kekeisen",
      "email": "thomas.kekeisen@socialbit.de",
      "enabled": true,
      "firstName": "Thomas",
      "fullName": "Thomas Kekeisen",
      "houseNumber": null,
      "language": "de",
      "lastName": "Kekeisen",
      "salt": null,
      "street": null,
      "username": "thomas.kekeisen",
      "zipCode": null
    }, {
      "@context": "/api/contexts/User",
      "@id": "/api/users/f02b7cf7-acc2-11e6-b176-0258ac71fd57",
      "@type": "User",
      "birthdate": null,
      "city": "Konstanz",
      "country": "Deutschland",
      "displayName": "Adel Grimm",
      "email": null,
      "enabled": true,
      "firstName": "Adel",
      "fullName": "Adel Grimm",
      "houseNumber": null,
      "language": "en",
      "lastName": "Grimm",
      "salt": null,
      "street": "Zur Laube 5",
      "username": null,
      "zipCode": 78462
    }
  ],
  "hydra:totalItems": 2
}

describe('Basic arguments', function() {
  it('should handle an empty object', function() {
    const cleaned = hydra({});
    cleaned.should.be.a('object');
  });
  it('should handle a null object', function() {
    const cleaned = hydra(null);
    cleaned.should.be.a('object');
  });
  it('should handle an array of nulls', function() {
    const cleaned = hydra([null, null, null]);
    cleaned.should.be.a('array');
    cleaned.should.have.length(3);
  });
  it('should handle an array of empty objects', function() {
    const cleaned = hydra([{}, {}, {}]);
    cleaned.should.be.a('array');
    cleaned.should.have.length(3);
  });
});

describe('Cleanup', function() {
  it('should remove @ from the root object', function() {
    const cleaned = hydra(data);
    const keys = _.filter(Object.keys(cleaned), function(key) { return key.indexOf('@') === 0; });
    keys.should.have.length(0);
  });
  it('should remove context and search from the root object', function() {
    const cleaned = hydra(data);
    should.not.exist(cleaned['@context']);
    should.not.exist(cleaned['@search']);
    should.not.exist(cleaned['context']);
    should.not.exist(cleaned['search']);
  });
  it('should remove the hydra: prefix from any property of the root object', function() {
    const cleaned = hydra(data);
    const keys = _.filter(Object.keys(cleaned), function(key) { return key.indexOf('hydra:') === 0; });
    keys.should.have.length(0);
  });
});
