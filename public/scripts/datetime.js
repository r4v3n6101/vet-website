function generateRandomStr() {
    return Math.random().toString(36).substring(2, 15);
}

function generateDateButtons(id, modal) {
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let buttons = [];
    let uniqueBlockId = modal ? "date" : generateRandomStr();
    let currentDate = new Date();
    for (let i = 0; i < 7; i++) { // One week
        let nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + i);
        let dayOfMonth = nextDate.getDate();
        let shortName = capitalize(nextDate.toLocaleString('ru-ru', {weekday: 'short'}))
        let data = nextDate.toLocaleString('ru-ru', {day: "2-digit", month: "2-digit", year: '2-digit'})
        let uniqueElementId = generateRandomStr();
        buttons.push(`<div class="date_button">
            <input id="date_${uniqueElementId}" 
                type="radio" name="${uniqueBlockId}" nameid="${id}" value="${data}">
            <label for="date_${uniqueElementId}">${shortName}<br>${dayOfMonth}</label>
        </div>`);
    }
    return buttons;
}

function generateTimeButtons(id, times, modal) {
    let timeButtons = [];
    let uniqueBlockId = modal ? "time" : generateRandomStr();
    for (let i = 0; i < times.length; i++) {
        let time = times[i];
        if (modal) {
            let uniqueElementId = generateRandomStr();
            timeButtons.push(`<div class="time_button">
                <input id="time_${uniqueElementId}" type="radio" name="${uniqueBlockId}" value="${time}" required>
                <label for="time_${uniqueElementId}">${time}</label>
            </div>`);
        } else {
            timeButtons.push(`<a href="/modal?name=${id}" class="time_alabel" data-modal="">${time}</a>`)
        }
    }
    return timeButtons;
}

function setupDateTimeSelector(dateTimeSelector, modal) {
    let id = modal ?
        dateTimeSelector.closest('.modal_window_main').find('.clinic_name').text()
        : dateTimeSelector.closest('.product_card').find('.clinic_name').text();

    let dateButtons = generateDateButtons(id, modal);
    dateTimeSelector.find('.date_selector').html(dateButtons);

    let inputs = dateTimeSelector.find('.date_button input');
    inputs.change(function () {
        let name = $(this).attr('nameid');
        let date = $(this).val();
        let timeSelector = dateTimeSelector.find('.time_selector');

        $.get("/api/time", {name, date}, function (data) {
            let timeButtons = generateTimeButtons(name, data, modal);
            timeSelector.html(timeButtons);
        });
    });

    inputs.first().attr('checked', true).change();
}