from django.db import models

# Create your models here.
class Media(models.Model):
    tournament = models.ForeignKey('tournaments.Tournament', on_delete=models.CASCADE)
    MEDIA_CHOICES = [("PHO", "Photos"), ("VID", "Video")]
    media_type = models.CharField(max_length=3, choices=MEDIA_CHOICES)
    url = models.URLField()
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.tournament} {self.name}"
