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
  // dates are TZ a bit err.. inconsistent in JS
  // using dashes will end up a day off. split to use commas between date
  // components
  let start = new Date(startDate.split('-'));
  let end = new Date(endDate);
  startString = `${stringMonth(start)} ${start.getDate()}, ${start.getFullYear()}`;
  console.log(start);
  return startString
}

function eventDisplay(pbEvent) {
  for (item of pbEvent) {
    container = document.getElementById("event-container");
    var title = document.createElement("h2");
    title.innerHTML = `${item.name}`;
    container.appendChild(title);
    var date = document.createElement("h3");
    date.innerHTML = `${getDates(item.start_date, item.end_date)}`;
    container.appendChild(date);
    var para = document.createElement("p");
    para.innerHTML = `
      <b>${item.location}</b><br />
      ${item.address}<br />
      ${item.city}<br />
      <a href=${item.url}>Event Link</a>`;
    container.appendChild(para);
    var space = document.createElement("div");
    space.innerHTML = "&nbsp;";
    container.appendChild(space);
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
