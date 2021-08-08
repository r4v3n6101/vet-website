const config = require('./config');
const clone = require('just-clone');

function getCopiedClinics() {
    return clone(config.clinics);
}

function getClinics(name, region) {
    let clinics = getCopiedClinics();
    return name != null || region != null ?
        clinics.filter((x) => name === x.name || region === x.region) :
        clinics;
}

module.exports = getClinics;