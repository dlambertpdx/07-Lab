const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search?token=';
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;

module.exports = {
    getEvent(lat, lng) {
        const url = `${BASE_URL}${EVENTBRITE_API_KEY}&location.latitude=${lat}&location.longitude=${lng}`;

        return request
            .get(url)
            .then(res => {
                return formatEvent(res.body);
            });
    }
};


function formatEvent(response) {
    const data = response.events;
    return data.map(formatData);
}

function formatData(event) {
    return {
        link: event.description.url,
        name: event.name.text,
        event_date: event.start.utc,
        summary: event.description.text
    };
}