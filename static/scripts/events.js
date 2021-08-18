var eventData;

function stringMonth(eventDate) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[eventDate.getMonth()];
}

function getDates(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  startString = `${stringMonth(start)} ${start.getDate()}, ${start.getFullYear()}`;
  return startString
}

function eventDisplay(pbEvent) {
  for (item of pbEvent) {
    container = document.getElementById("event-container");
    var title = document.createElement("h4");
    title.innerHTML = `${item.name}<small>${getDates(item.start_date, item.end_date)}</small>`;
    container.appendChild(title);
    var para = document.createElement("p");
    para.innerHTML = `<span class="icon-location"></span><b>${item.location}</b><br />
      ${item.address}<br />
      ${item.city}<br />
      <a href=${item.url}>Event Link</a>`;
    container.appendChild(para);
  }
}

function getEvents() {
  let events = new Set();
  for (pbEvent of eventData) {
    if (Date.parse(pbEvent.start_date) >= Date.now()) {
      events.add(pbEvent);
    }
  }
  console.log(events);
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
