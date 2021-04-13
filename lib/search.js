const clinics_data = [
    {
        "name": "Test name",
        "image": "", // Default image
        "labour_time": "20:00",
        "rating": 95,
        "comments_num": 12,
        "rec_perc": 71.3,
        "phone": "+7 (999) 444-22-00",
        "address": "ул. Пушкина д. Колотушкина",
        "description": "Описание чудесной клиники",
        "services": {
            "1": "100",
            "2": "200",
            "3": "300",
            "4": "400"
        }
    }
];

function acquire_data(clinic_name, region, preview) {
    let data = search(clinic_name, region);
    if (preview) { // Just reduce services to 3
        data[0]['services'] = Object.fromEntries(Object.entries(data[0]['services']).slice(0, 3))
    }
    return data
}

function search(clinic_name, region) {
    return clinics_data
}

module.exports = acquire_data