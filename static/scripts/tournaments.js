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
function createResultTable(data) {
    document.getElementById("result-container").innerHTML = "";
    for (item of data) {
        var heading = document.createElement("h3").appendChild(document.createTextNode(item.year + " - " + item.league));
        document.getElementById("result-container").appendChild(heading);
        var table = document.createElement("table");
        header = table.createTHead();
        let row = header.insertRow(0);
        row.insertCell(0).textContent = "Place";
        row.insertCell(1).textContent = "Team";
        row.insertCell(2).textContent = "Division";
        row.insertCell(3).textContent = "Format";
        document.getElementById("result-container").appendChild(table);
        for (result of item.results) {
            let row = table.insertRow();
            //let newCell = table.rows[table.rows.length -1].insertCell();
            row.insertCell(0).textContent = result.place;
            row.insertCell(1).textContent = result.team;
            row.insertCell(2).textContent = result.division;
            row.insertCell(3).textContent = result.format;
        }
    }
}
function selectYear(selectObject) {
    console.log(selectObject);
    let value = selectObject.value;
    result = getResultsByYear(tournamentData, value);
    createResultTable(result);
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
        y = getYears(json);
        createSelector(y, "year");
        console.log(y);
        l = getLeagues(json);
        createSelector(l, "league");
        console.log(l);
    })
    .catch(console.error);