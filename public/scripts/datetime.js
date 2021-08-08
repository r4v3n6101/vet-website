function generateDateButtons() {
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let buttons = [];
    let currentDate = new Date();
    for (let i = 0; i < 7; i++) { // One week
        let nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + i);
        let dayOfMonth = nextDate.getDate();
        let shortName = capitalize(nextDate.toLocaleString('ru-ru', {weekday: 'short'}))
        let data = nextDate.toLocaleString('ru-ru', {day: "2-digit", month: "2-digit", year: '2-digit'})
        buttons.push(`<button class="date_button" date-data="${data}">${shortName}<br>${dayOfMonth}</button>`)
    }
    return buttons;
}

function pasteIntoDateSelector() {
    let dateButtons = generateDateButtons();
    $('.date_selector').html(dateButtons);
}

function generateTimeButtons(times, modal, name) {
    let timeButtons = [];
    for (const time of times) {
        if (modal) {
            timeButtons.push(`<button type="button" class="time_button">${time}</button>`)
        } else {
            timeButtons.push(`<a href="/modal?name=${name}" class="time_button" data-modal="">${time}</a>`)
        }
    }
    return timeButtons;
}

function pasteIntoTimeSelector(times, modal, name) {
    let timeButtons = generateTimeButtons(times, modal, name);
    $('.time_selector').html(timeButtons);
}

function dateButtonClickEvent(modal) {
    $('.date_button').click(function () {
        let name = $(this).closest('.product_card').find('.clinic_name').text(); // Get from title h3
        let date = $(this).attr('date-data');

        $.get("/api/time", {name, date}, function (data) {
            pasteIntoTimeSelector(data, modal, name);
        });
    })
}

function setupDateTimeEvents(modal) {
    pasteIntoDateSelector();
    dateButtonClickEvent(modal);
    $('.date_selector > .date_button:first').click();
}