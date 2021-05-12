const got = require('got');

const RATING_REGEX = /<p class="mini-badge__stars-count">(.*?)<\/p>/;

function parseRating(html) {
    let parsed = html.match(RATING_REGEX);
    return parsed && parsed.length > 1 ? parsed[1] : 0;
}

function getRating(url) {
    return got(url).then(
        response => parseRating(response.body),
        error => Promise.reject({code: 502, err: error})
    );
}

module.exports = getRating;