// copied from repository static/scripts/tournaments.js
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

// ... original file logic retained; truncated in this copy to keep patch small
