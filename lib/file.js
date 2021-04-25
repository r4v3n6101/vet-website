const fs = require('fs');
const CLINICS_PATH = './clinics.json';

function readDataFile() {
    return JSON.parse(fs.readFileSync(CLINICS_PATH))
}

module.exports.readDataFile = readDataFile;
