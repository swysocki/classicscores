var tournamentData;

function getYears(scoresData) {
    let years = new Set();
    for (tournament of scoresData) {
        years.add(tournament.year);
    }
    // Sort the values so they display well
    // the spread operator is useful to convert set to an array
    return [...years].sort();
}

function getLeagues(scoresData) {
    let leagues = new Set();
    for (tournament of scoresData) {
        leagues.add(tournament.league);
    }
    return leagues;
}

function createSelector(data, name) {
    var SelectList = document.createElement("select");
    SelectList.id = name + "-selector";
    SelectList.setAttribute("onchange", "selectYear(this)");
    document.getElementById(name + "-container").appendChild(SelectList);
    for (item of data) {
        var option = document.createElement("option");
        option.value = item;
        option.text = item;
        SelectList.appendChild(option);
    }
}

// combine these two functions
function getResultsByYear(data, year) {
    result = data.filter(item => item.year == year)
    return result
}

function getResultbyLeague(data, league) {
    result = data.filter(item => item.leageu == league)
    return result
}

function createTournamentHeading(element, tournament) {
    var heading = document.createElement("h2");
    var text = document.createTextNode(tournament.year + " - " + tournament.league);
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
                format: item.format,
                division: item.division,
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

function createResultTable(data) {
    document.getElementById("result-container").innerHTML = "";
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
        console.log(groups);
        for (tournament of groups) {

            for (result of tournament.results) {
                let scoreRow = body.insertRow();
                //let newCell = table.rows[table.rows.length -1].insertCell();
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

function selectYear(selectObject) {
    console.log(selectObject);
    let value = selectObject.value;
    result = getResultsByYear(tournamentData, value);
    createResultTable(result);
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
    })
    .catch(console.error);