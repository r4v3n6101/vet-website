const {google} = require("googleapis");
const config = require('./config');
const contactsSpreadsheetId = config.google_data.contacts_spreadsheet_id;
const client = new google.auth.JWT(
    config.google_data.client_email,
    null,
    config.google_data.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
);

module.exports = {
    authGetApi: authorizeGsApi,
    makeContact: function (gsApi, name, number, messenger) {
        return addContact(gsApi, contactsSpreadsheetId, name, number, messenger);
    },
    makeAppointment: appointment,
    getFreeTimes: freeTimes,
};

function authorizeGsApi(callback) {
    client.authorize(callback);
    return google.sheets({version: "v4", auth: client})
}

async function addContact(gsApi, spreadsheetId, name, number, messenger) {
    const options = {
        spreadsheetId: spreadsheetId,
        range: "A:A"
    }

    let data = await gsApi.spreadsheets.values.get(options)
    let dataArray = data.data.values
    let index = dataArray.length + 1

    const updateOptions = {
        spreadsheetId: spreadsheetId,
        range: "A" + index + ":D" + index,
        valueInputOption: "USER_ENTERED",
        resource: {values: [[name, number, messenger, '-']]}
    }

    await gsApi.spreadsheets.values.update(updateOptions)
}

async function getFreeTimes(gsApi, options, date) {
    let dataArray = (await gsApi.spreadsheets.values.get(options)).data.values;
    let found = false;
    let free = [];

    for (let i = 0; i < dataArray.length; i++) {
        let r = dataArray[i];
        if (r[0] === date) {
            found = true;
            if (r.length === 2) free.push(r[1]);
        } else if (found) break;
    }

    return free;
}

async function freeTimes(gsApi, spreadsheetId, date) {
    const options = {spreadsheetId: spreadsheetId}
    const sheetList = (await gsApi.spreadsheets.get(options)).data.sheets.map(s => s.properties.title)

    for (let i = 0; i < sheetList.length; i++) {
        options.range = sheetList[i] + "!A:A"
        let sheetData = (await gsApi.spreadsheets.values.get(options)).data.values
        if (containsDate(sheetData, date)) {
            options.range = sheetList[i] + "!A:C"
            return await getFreeTimes(gsApi, options, date)
        }
    }
}

async function makeAppointment(gsApi, options, date, time, number, fio, animal, comment) {
    let dataArray = (await gsApi.spreadsheets.values.get(options)).data.values
    let found = false
    let index = 1
    let changed = false

    for (let i = 0; i < dataArray.length; i++) {
        let r = dataArray[i]
        if (r[0] === date) {
            found = true
            if (r.length === 2 && r[1] === time) {
                r.push(number, fio, animal, comment)
                changed = true
                index = i + 1
                break
            }
        } else if (found) {
            index = i
            break
        }
    }

    if (changed) {
        const range = options.range
        const updateOptions = {
            spreadsheetId: options.spreadsheetId,
            range: range.substring(0, range.length - 2) + index + ":F" + index,
            valueInputOption: "USER_ENTERED",
            resource: {values: dataArray.slice(index - 1, index)}
        };

        await gsApi.spreadsheets.values.update(updateOptions)
    }
}

async function appointment(gsApi, spreadsheetId, date, time, number, fio, animal, comment) {
    const options = {spreadsheetId: spreadsheetId}
    const sheetList = (await gsApi.spreadsheets.get(options)).data.sheets.map(s => s.properties.title)

    for (let i = 0; i < sheetList.length; i++) {
        options.range = sheetList[i] + "!A:A"
        let sheetData = (await gsApi.spreadsheets.values.get(options)).data.values
        if (containsDate(sheetData, date)) {
            options.range = sheetList[i] + "!A:C"
            await makeAppointment(gsApi, options, date, time, number, fio, animal, comment)
        }
    }
}

function containsDate(sheetName, date) {
    return sheetName.flat().includes(date);
}