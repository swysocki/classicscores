var tournamentData;
var yearCount;
var leagueCount;

var formatMap = {
    "10M": "10 Man",
    "5M": "5 Man",
    "7M": "7 Man",
    "3M": "3 Man",
    "XB": "Xball",
}

var leagueMap = {
    "NPPL": "National Professional Paintball League",
    "GWS": "Great Western Series",
    "MSPA": "MidSouth Paintball Association",
    "ICPL": "International Classic Paintball League",
    "UWL": "Ultimate Woodsball League",
    "IAO": "International Amateur Open",
    "WTS": "Woodsball Tournament Series",
    "WCCP": "West Coast Classic Paintball",
    "WPF": "World Paintball Federation",
    "PRA": "Professional Referee Association",
    "CFOA": "Carolina Field Owners Association",
    "INDY": "Independent Events",
}

var divisionMap = {
    "AM": "Amateur",
    "AMA": "Amateur A",
    "AMB": "Amateur B",
    "PRO": "Professional",
    "NOV": "Novice",
    "SP": "SemiPro",
    "OP": "Open",
    "RK": "Rookie",
    "D1": "Division 1",
    "D2": "Division 2",
    "D3": "Division 3",
    "D4": "Division 4",
    "D5": "Division 5",
    "TCT": "Tactical",
    "UNK": "Unknown",
    "COL": "College",
    "YNG": "Young Guns",
    "A": "A",
    "AA": "AA",
    "AAA": "AAA",
}

function displayStats() {
    document.getElementById("tournament-count").textContent = tournamentData.length + " Tournaments";

    let scoresCount = 0;
    for (score of tournamentData) {
        scoresCount += score.results.length;
    }
    document.getElementById("scores-count").textContent = scoresCount + " Scores";
    document.getElementById("year-count").textContent = yearCount + " Years"
    document.getElementById("league-count").textContent = leagueCount + " Leagues";
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
    var option = document.createElement("option");
    option.value = "";
    option.text = "Choose a " + name;
    SelectList.appendChild(option);
    for (item of data) {
        var option = document.createElement("option");
        option.value = item;
        if (name == "league") {
            option.text = leagueMap[item]
        } else {
            option.text = item;
        }
        SelectList.appendChild(option);
    }
}

function getResultByValue(selectObject) {
    let result = [];
    if (selectObject.id.includes("year")) {
        result = tournamentData.filter(item => item.year == selectObject.value);
    }
    if (selectObject.id.includes("league")) {
        result = tournamentData.filter(item => item.league == selectObject.value);
    }
    createResultTable(result);
}

function createTournamentHeading(element, tournament) {
    var heading = document.createElement("h2");
    var text = document.createTextNode(tournament.year + " - " + leagueMap[tournament.league]);
    heading.appendChild(text);
    element.appendChild(heading);

    var subHeading = document.createElement("h3");
    var subText = document.createTextNode((tournament.name ? tournament.name + " :: " : "") + tournament.location);
    subHeading.appendChild(subText);
    element.appendChild(subHeading);
}

function groupTournaments(tournResults) {
    // Ugly function to group by divsion + format
    var groupName = {};
    var results = tournResults.reduce(function(accumulator, item) {
        var key = item.division + " - " + item.format;
        if (!groupName[key]) {
            groupName[key] = Object.assign({}, {
                format: formatMap[item.format],
                division: divisionMap[item.division],
                results: [{
                    place: item.place,
                    team: item.team
                }]
            });
            accumulator.push(groupName[key]);
        } else {
            groupName[key].results.push({
                place: item.place,
                team: item.team
            });
        }
        return accumulator;

    }, []);
    return results
}

function sortByProperty(property) {
    return function(a, b) {
        let comparison = 0;
        if (a[property] > b[property]) {
            comparison = 1;
        } else if (a[property] < b[property]) {
            comparison = -1;
        }
        return comparison;
    }
}


function createResultTable(data) {
    document.getElementById("result-container").innerHTML = "";
    data.sort(sortByProperty("year"));
    for (item of data) {
        container = document.getElementById("result-container");
        createTournamentHeading(container, item);

        var table = document.createElement("table");
        table.setAttribute("class", "pure-table pure-table-horizontal score-table");
        header = table.createTHead();
        let row = header.insertRow(0);
        row.insertCell(0).textContent = "Place";
        row.insertCell(1).textContent = "Team";
        row.insertCell(2).textContent = "Division";
        row.insertCell(3).textContent = "Format";
        container.appendChild(table);
        body = table.createTBody();

        groups = groupTournaments(item.results);
        for (tournament of groups) {
            tournament.results.sort(sortByProperty("place"));
            for (result of tournament.results) {
                let scoreRow = body.insertRow();
                scoreRow.insertCell(0).textContent = result.place;
                scoreRow.insertCell(1).textContent = result.team;
                scoreRow.insertCell(2).textContent = tournament.division;
                scoreRow.insertCell(3).textContent = tournament.format;
            }
            let blankRow = body.insertRow();
            blankRow.insertCell(0).setAttribute("colspan", "4");
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
    })
    .catch(console.error);