const getClinics = require('./utils/clinics'),
    gtable = require('./utils/gtable'),
    verification = require('./utils/verification')

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
        if (!verification.verifyDate(date)) return Promise.reject('Wrong parameters')

        let clinics = getClinics(name, null);
        if (!verification.verifyClinics(clinics)) return Promise.reject('Clinic not found');

        let spreadsheetId = clinics[0].spreadsheetId;
        return gtable.getFreeTimes(gsApi, spreadsheetId, date)
            .catch(() => Promise.reject('gtable error'));
    },
    newContact: function (name, number, messenger) {
        if (!(verification.verifyPhone(number) && verification.verifyMessenger(messenger)))
            return Promise.reject('Wrong parameters');
        return gtable.makeContact(gsApi, name, number, messenger)
            .catch(() => Promise.reject('gtable error'));
    },
    newAppointment: function (name, date, time, number, fio, animal, comment) {
        if (!(verification.verifyDate(date) && verification.verifyTime(time) && verification.verifyPhone(number)))
            return Promise.reject('Wrong parameters');
        let clinics = getClinics(name, null);
        if (!verification.verifyClinics(clinics)) return Promise.reject('Clinic not found');

        let spreadsheetId = clinics[0].spreadsheetId;
        return gtable.makeAppointment(gsApi, spreadsheetId, date, time, number, fio, animal, comment)
            .catch(() => Promise.reject('gtable error'));

    }
};