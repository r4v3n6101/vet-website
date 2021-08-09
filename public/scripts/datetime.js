function generateDateButtons(id) {
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let buttons = [];
    let uniqueBlockId = Math.random().toString(36).substring(2, 15);
    let currentDate = new Date();
    for (let i = 0; i < 7; i++) { // One week
        let nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + i);
        let dayOfMonth = nextDate.getDate();
        let shortName = capitalize(nextDate.toLocaleString('ru-ru', {weekday: 'short'}))
        let data = nextDate.toLocaleString('ru-ru', {day: "2-digit", month: "2-digit", year: '2-digit'})
        let uniqueElementId = Math.random().toString(36).substring(2, 15);
        buttons.push(`<div class="date_button">
            <input id="date_${uniqueElementId}" type="radio" name="${uniqueBlockId}" nameid="${id}" value="${data}">
            <label for="date_${uniqueElementId}">${shortName}<br>${dayOfMonth}</label>
        </div>`);
    }
    return buttons;
}

function generateTimeButtons(id, times, modal) {
    let timeButtons = [];
    for (let i = 0; i < times.length; i++) {
        let time = times[i];
        if (modal) {
            timeButtons.push(`<div class="time_button">
                <input id="time_button${i}_modal" type="radio" name="${id}" value="${time}">
                <label for="time_button${i}_modal">${time}</label>
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

    let dateButtons = generateDateButtons(id);
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