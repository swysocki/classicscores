import * as React from "react"
import Select from "react-select"
import "./menu.css"
import JSONData from "../../content/tournament_data.json"

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
}

function getYears(scoresData) {
  let years = new Set()
  var tournament
  for (tournament of scoresData) {
    years.add(tournament.year)
  }
  // Sort the values so they display well
  // the spread operator is useful to convert set to an array
  let yearOptions = []
  var sortedYears = [...years].sort()
  sortedYears.forEach(element => {
    yearOptions.push({ value: element, label: element })
  })
  return yearOptions
}

function getLeagues(scoresData) {
  let leagues = new Set()
  var tournament
  for (tournament of scoresData) {
    leagues.add(tournament.league)
  }
  let leagueOptions = []
  var distinctLeagues = [...leagues]
  distinctLeagues.forEach(element => {
    leagueOptions.push({ value: element, label: leagueMap[element] })
  })
  return leagueOptions
}

export default function Menu() {
  var years = getYears(JSONData)
  var leagues = getLeagues(JSONData)
  return (
    <div class="menu">
      <div class="pure-g">
        <div id="year-container" class="pure-u-1 pure-u-md-1-2">
          <h3>Years</h3>
          <Select options={years} />
        </div>
        <div id="league-container" class="pure-u-1 pure-u-md-1-2">
          <h3>Leagues</h3>
          <Select options={leagues} />
        </div>
      </div>
    </div>
  )
}
