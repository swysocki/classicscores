var eventData

function eventDisplay(pbEvent) {
  for (item of pbEvent) {
    container = document.getElementById("event-container");
    var title = document.createElement("h3");
    title.innerHTML = item.name;
    container.appendChild(title);
    var para = document.createElement("p");
    para.innerHTML = 
      `${item.start_date} - ${item.end_date}<br />
      <b>${item.location}</b><br />
      ${item.address}<br />
      ${item.city}<br />`;
    container.appendChild(para);
  }
}

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
    events = getEvents();
    eventDisplay(events);
  })
  .catch(console.error);
