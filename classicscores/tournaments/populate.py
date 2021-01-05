from .models import Tournament, Score
from datetime import datetime


def create_tourn(tourn_dict):
    t = Tournament(
        pub_date=datetime.now(),
        league=tourn_dict.get("league"),
        year=tourn_dict.get("year"),
        location=tourn_dict.get("location"),
        name=tourn_dict.get("name"),
    )
    print(f"writing {t}")
    t.save()

    for sc in tourn_dict.get("results"):
        s = Score(
            tournament=t,
            tournament_format=sc.get("format"),
            division=sc.get("division"),
            team=sc.get("team"),
            place=sc.get("place"),
        )
        s.save()


def populate(tourn_list):
    for t in tourn_list:
        create_tourn(t)