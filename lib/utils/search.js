/** Data scheduler part **/
const file = require('./file');
let data = '[]';

function updateData() {
    data = file.readDataFile();
    console.log('Clinics from file updated');
}

updateData() // Initialization of variable with first execution
setInterval(updateData, 24 * 60 * 60 * 1000); // 24 hour

/** Data acquiring part **/

function parseCopiedData() {
    return JSON.parse(data);
}

function filterData(clinicName, region) {
    let clinics = parseCopiedData(data);
    if (clinicName != null || region != null) {
        return clinics.filter(function (x) {
            return (clinicName != null && x.name === clinicName) || (region != null && x.region === region)
        });
    }
    return clinics;
}

function acquireData(clinicName, region, preview) {
    let clinics = filterData(clinicName, region);
    if (preview) {
        return clinics.map(function (x) {
            // Cut down to the first 3 elements
            x['services'] = Object.fromEntries(Object.entries(x['services']).slice(0, 3))
            return x;
        });
    }
    return clinics;
}

module.exports = acquireData;