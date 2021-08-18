var eventData

function getEvents() {
  let events = new Set();
  for (pbEvent of eventData) {
    if (Date.parse(pbEvent.start_date) >= Date.now()) {
      events.add(pbEvent)
    }
  }
  console.log(events)
  return events;
}

fetch("/static/data/event_data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then((json) => {
    eventData = json;
    getEvents();
  })
  .catch(console.error);
