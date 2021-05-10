const getClinics = require('./utils/clinics');
const gtable = require('./utils/gtable');

const gsApi = gtable.authGetApi(function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log('GAPI module successfully initialized');
    }
});

module.exports = {
    getClinics: getClinics,
    getFreeTime: function (name, date) {
        let clinic = getClinics(name, null);
        let spreadsheetId = clinic.spreadsheetId;
        return gtable.getFreeTimes(gsApi, spreadsheetId, date);
    },
    newContact: function (name, number, messenger) {
        return gtable.makeContact(gsApi, name, number, messenger);
    }
};