from django.shortcuts import render, redirect
from .models import Media

COMPONENTS = ["year", "league"]

# Create your views here.
def index(request):
    media = Media.objects.all()
    return render(request, "media/index.html", {"result": media})

def component(request, query):
    media = Media.objects.filter(tournament=query)
    return render(request, "media/index.html", {"result": media})