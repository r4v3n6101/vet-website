const search = require('./utils/search');

function processSearch(clinicName, region, preview) {
    let data = search(clinicName, region, preview);
    // TODO : add times to data
    return data;
}

module.exports.search = processSearch;