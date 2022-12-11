var tournamentData;
var yearCount;
var leagueCount;

var leagueMap = {
  NPPL: "National Professional Paintball League",
  GWS: "Great Western Series",
  MSPA: "MidSouth Paintball Association",
  ICPL: "International Classic Paintball League",
  UWL: "Ultimate Woodsball League",
  IAO: "International Amateur Open",
  WTS: "Woodsball Tournament Series",
  WCCP: "West Coast Classic Paintball",
  WPF: "World Paintball Federation",
  PRA: "Professional Referee Association",
  CFOA: "Carolina Field Owners Association",
  INDY: "Independent Events",
  WWC: "Woodsball World Cup",
};

var divisionMap = {
  AM: "Amateur",
  AMA: "Amateur A",
  AMB: "Amateur B",
  PRO: "Pro",
  NOV: "Novice",
  SP: "SemiPro",
  OP: "Open",
  RK: "Rookie",
  D1: "Division 1",
  D2: "Division 2",
  D3: "Division 3",
  D4: "Division 4",
  D5: "Division 5",
  TCT: "Tactical",
  UNK: "Unknown",
  COL: "College",
  YNG: "Young Guns",
};

var formatMap = {
  "10M": "10 Man",
  "5M": "5 Man",
  "7M": "7 Man",
  "3M": "3 Man",
  XB: "Xball",
};

function displayStats() {
  let scoresCount = 0;
  let thisYear = new Date().getFullYear();
  for (score of tournamentData) {
    scoresCount += score.results.length;
  }
  footerText = `© 2018 - ${thisYear} ClassicScores | ${yearCount} Years | ${scoresCount} Scores`
  document.getElementById("stats").innerHTML = footerText;
}

function getYears(scoresData) {
  let years = new Set();
  for (tournament of scoresData) {
    years.add(tournament.year);
  }
  // Sort the values so they display well
  // the spread operator is useful to convert set to an array
  yearCount = [...years].length;
  return [...years].sort();
}

function getLeagues(scoresData) {
  let leagues = new Set();
  for (tournament of scoresData) {
    leagues.add(tournament.league);
  }
  leagueCount = [...leagues].length;
  return leagues;
}

function createSelector(data, name) {
  var SelectList = document.createElement("select");
  SelectList.id = name + "-selector";
  SelectList.setAttribute("onchange", "getResultByValue(this)");
  document.getElementById(name + "-container").appendChild(SelectList);
  for (item of data) {
    var option = document.createElement("option");
    option.value = item;
    if (name == "league") {
      option.text = leagueMap[item];
    } else {
      option.text = item;
    }
    SelectList.appendChild(option);
  }
}

function getResultByValue(selectObject) {
  let result = [];
  if (selectObject.id.includes("year")) {
    result = tournamentData.filter((item) => item.year == selectObject.value);
  }
  if (selectObject.id.includes("league")) {
    result = tournamentData.filter((item) => item.league == selectObject.value);
  }
  createResultTable(result);
}

function createTournamentHeading(element, tournament) {
  var subHeading = document.createElement("h2");
  var subSubHeading = document.createElement("h3");
  var nameLocation =
    (tournament.name ? tournament.name + "-" : "") + tournament.location;
  subHeading.innerHTML = `
    ${tournament.year} ${leagueMap[tournament.league]}
  `
  subSubHeading.innerHTML = nameLocation;
  element.appendChild(subHeading);
  element.appendChild(subSubHeading);
}

function groupTournaments(tournResults) {
  // Ugly function to group by division + format
  var groupName = {};
  var results = tournResults.reduce(function (accumulator, item) {
    var key = item.division + " - " + item.format;
    if (!groupName[key]) {
      groupName[key] = Object.assign(
        {},
        {
          format: item.format,
          division: item.division,
          results: [
            {
              place: item.place,
              team: item.team,
            },
          ],
        }
      );
      accumulator.push(groupName[key]);
    } else {
      groupName[key].results.push({
        place: item.place,
        team: item.team,
      });
    }
    return accumulator;
  }, []);
  return results;
}

function createResultTable(data) {
  document.getElementById("result-container").innerHTML = "";
  data.sort((a, b) => a.year - b.year);
  for (item of data) {
    container = document.getElementById("result-container");
    createTournamentHeading(container, item);

    groups = groupTournaments(item.results);
    for (tournament of groups) {
      var table = document.createElement("table");
      header = table.createTHead();
      let row = header.insertRow(0);
      row.insertCell(0).outerHTML = "<th>Place</th>";
      row.insertCell(1).outerHTML = "<th>Team</th>";
      row.insertCell(2).outerHTML = "<th>Division</th>";
      row.insertCell(3).outerHTML = "<th>Format</th>";
      container.appendChild(table);
      table.insertAdjacentHTML('afterend', '&nbsp;')
      body = table.createTBody();

      tournament.results.sort((a, b) => a.place - b.place);
      for (result of tournament.results) {
        let scoreRow = body.insertRow();
        place = scoreRow.insertCell(0);
        place.textContent = result.place;
        team = scoreRow.insertCell(1);
        team.textContent = result.team;
        division = scoreRow.insertCell(2);
        division.textContent = divisionMap[tournament.division];
        format = scoreRow.insertCell(3);
        format.textContent = formatMap[tournament.format];
      }
    }
  }
}

function createMenu() {
  years = getYears(tournamentData);
  createSelector(years, "year");
  leagues = getLeagues(tournamentData);
  createSelector(leagues, "league");
}

fetch("/static/data/tournament_data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then((json) => {
    tournamentData = json;
    createMenu();
    displayStats();
    res = document.getElementById("year-selector");
    res.value = "1992";
    getResultByValue(res);
  })
  .catch(console.error);
