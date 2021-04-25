/** Data scheduler part **/
const file = require('./file');
let data = [];

function updateData() {
    data = file.readDataFile();
    console.log(`Number of clinics after updates: ${data.length}`);
}

updateData() // Initialization of variable with first execution
setInterval(updateData, 24 * 60 * 60 * 1000); // 24 hour

/** Data acquiring part **/

function acquire_data(clinic_name, region, preview) {
    let data = search(clinic_name, region);
    if (preview) { // Just reduce services to 3
        data[0]['services'] = Object.fromEntries(Object.entries(data[0]['services']).slice(0, 3))
    }
    return data
}

function search(clinic_name, region) {
    return data
}

module.exports = acquire_data