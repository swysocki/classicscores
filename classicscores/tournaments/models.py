from datetime import datetime
from django.db import models

# Create your models here.
class Tournament(models.Model):
    LEAGUE_CHOICES = [
        ("NPPL", "National Professional Paintball League"),
        ("GWS", "Great Western Series"),
        ("UWL", "Ultimate Woodsball League"),
        ("PRA", "Professional Referee Association"),
        ("MSPA", "MidSouth Paintball Association"),
        ("WPF", "World Paintball Federation"),
        ("WCCP", "West Coast Classic Paintball"),
        ("IAO", "International Amateur Open"),
        ("ICPL", "International Classic Paintball League"),
        ("CFOA", "Carolina Field Owners Association"),
        ("WTS", "Woodsball Tournament Series"),
        ("INDY", "Independent Event"),
        ("WWC", "Woodsball World Cup"),
    ]
    pub_date = models.DateField("date published")
    league = models.CharField(max_length=50, choices=LEAGUE_CHOICES)
    year = models.PositiveSmallIntegerField(default=datetime.today().year)
    location = models.CharField(max_length=75)
    name = models.CharField(max_length=50)
    virtual_league = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.year}-{self.league}-{self.location}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["year", "league", "location", "name"], name="unique tournament"
            )
        ]


class Score(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    TENMAN = "10M"
    FIVEMAN = "5M"
    SEVENMAN = "7M"
    THREEMAN = "3M"
    XBALL = "XB"
    FORMAT_CHOICES = [
        (TENMAN, "10 man"),
        (FIVEMAN, "5 man"),
        (SEVENMAN, "7 man"),
        (THREEMAN, "3 man"),
        (XBALL, "Xball"),
    ]
    tournament_format = models.CharField(max_length=3, choices=FORMAT_CHOICES)

    AMATEUR = "AM"
    AMATEURA = "AMA"
    AMATEURB = "AMB"
    PRO = "PRO"
    NOVICE = "NOV"
    SEMIPRO = "SP"
    OPEN = "OP"
    ROOKIE = "RK"
    DIVISION1 = "D1"
    DIVISION2 = "D2"
    DIVISION3 = "D3"
    DIVISION4 = "D4"
    DIVISION5 = "D5"
    TACTICAL = "TCT"
    UNKNOWN = "UNK"
    COLLEGE = "COL"
    YOUNGGUNS = "YNG"

    DIVISION_CHOICES = [
        (AMATEUR, "Amateur"),
        (AMATEURA, "Amateur A"),
        (AMATEURB, "Amateur B"),
        (PRO, "Professional"),
        (NOVICE, "Novice"),
        (SEMIPRO, "Semi-Pro"),
        (OPEN, "Open"),
        (ROOKIE, "Rookie"),
        (DIVISION1, "Division 1"),
        (DIVISION2, "Division 2"),
        (DIVISION3, "Division 3"),
        (DIVISION4, "Division 4"),
        (DIVISION5, "Division 5"),
        (TACTICAL, "Tactical"),
        (UNKNOWN, "Unknown"),
        (COLLEGE, "College"),
        (YOUNGGUNS, "Young Guns"),
    ]

    division = models.CharField(max_length=3, choices=DIVISION_CHOICES)

    team = models.CharField(max_length=50)

    place = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.tournament}-{self.division}-{self.tournament_format}"

    def display_format(self):
        return f"{self.get_tournament_format_display()} - {self.get_division_display()}"
