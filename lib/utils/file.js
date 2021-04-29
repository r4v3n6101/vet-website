const fs = require('fs');
const CLINICS_PATH = './clinics.json';

/**
 * Read data file content (not parse it)
 * @returns {Buffer}
 */
function readDataFile() {
    return fs.readFileSync(CLINICS_PATH)
}

module.exports.readDataFile = readDataFile;
