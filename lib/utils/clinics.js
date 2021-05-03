/** Data reading part **/
const fs = require('fs');
const CLINICS_PATH = './clinics.json';

function readFile() {
    return fs.readFileSync(CLINICS_PATH)
}

/** Data scheduler part **/
let data = '[]';

function updateData() {
    data = readFile();
    console.log('Clinics from file updated');
}

updateData() // Initialization of variable with first execution
setInterval(updateData, 24 * 60 * 60 * 1000); // 24 hour

/** Data acquiring part **/
function parseCopiedData() {
    return JSON.parse(data);
}

function filterData(region) {
    let clinics = parseCopiedData(data);
    return region != null ? clinics.filter((x) => x.region === region) : clinics;
}

function getClinics(region, preview) {
    let clinics = filterData(region);
    if (preview) {
        return clinics.map(function (x) {
            // Cut down to the first 3 elements
            x['services'] = Object.fromEntries(Object.entries(x['services']).slice(0, 3))
            return x;
        });
    }
    return clinics;
}

module.exports = getClinics;