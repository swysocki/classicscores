from django.db import models


class Address(models.Model):
    street_address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=5)
    zipcode = models.CharField(max_length=10)


TYPE_CHOICE = [
    ("BIG", "Big Game"),
    ("SCEN", "Scenario"),
    ("TRN", "Tournament"),
    ("PRAC", "Practice"),
]


class Event(models.Model):
    name = models.CharField(max_length=50)
    address = models.ForeignKey(
        Address, blank=True, null=True, on_delete=models.SET_NULL
    )
    location_name = models.CharField(max_length=50)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    url = models.URLField()
    event_type = models.CharField(max_length=4, choices=TYPE_CHOICE)
    tournament = models.ForeignKey(
        "tournaments.Tournament", blank=True, null=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"{self.name}-{self.location_name}"
    