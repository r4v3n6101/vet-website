const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const DATE_REGEX = /(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.(\d{2})/;
const TIME_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
const MESSENGERS = ['Telegram', 'WhatsApp', 'Viber'];

function verifyPhone(number) {
    return PHONE_REGEX.test(number);
}

function verifyMessenger(messenger) {
    return MESSENGERS.includes(messenger)
}

function verifyDate(date) {
    return DATE_REGEX.test(date);
}

function verifyTime(time) {
    return TIME_REGEX.test(time);
}

function verifyClinics(clinics) {
    return clinics && clinics.length > 0;
}

module.exports = {
    verifyPhone: verifyPhone,
    verifyMessenger: verifyMessenger,
    verifyDate: verifyDate,
    verifyTime: verifyTime,
    verifyClinics: verifyClinics
}