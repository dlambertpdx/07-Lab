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
    const data = response.event.events;
    return data.map(formatData);
}

function formatData(event) {
    return {
        link: event.events.description.url,
        name: event.events.name.text,
        event_date: new Date(event.events.start.utc * 1000).toISOString(),
        summary: event.events.description.text
    };
}