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

function getClinics(name, region) {
    let clinics = parseCopiedData(data);
    return name != null || region != null ?
        clinics.filter((x) => name === x.name || region === x.region) :
        clinics;
}

module.exports = getClinics;