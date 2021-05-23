from django.shortcuts import render, redirect
from itertools import chain
from tournaments.models import Tournament, Score

COMPONENTS = ["year", "league"]
FIELD_NAMES = {"year": "tournament__year", "league": "tournament__league"}


def index(request, component=None):
    if component in COMPONENTS:
        result = Tournament.objects.order_by(component).distinct(component)
        context = {component: result, "component": component}
        return render(request, "tournaments/index.html", context)
    if component == "search":
        return render(request, "tournaments/index.html", {"component": component})
    years = Tournament.objects.order_by("year").distinct("year")
    leagues = Tournament.objects.order_by("league").distinct("league")
    context = {"year": years, "league": leagues}
    return render(request, "tournaments/index.html", context)


def component(request, component, query):
    if component in COMPONENTS:
        tournaments = Tournament.objects.filter(**{component: query}).order_by("year")
        return render(request, "tournaments/list.html", {"result": tournaments})
    return redirect(index)


def search(request):
    search_string = request.POST.get("team")
    if search_string:
        result = Tournament.objects.filter(
            score__team__icontains=search_string
        ).order_by("year")
        context = {"result": result, "search": search_string.lower()}
        return render(request, "tournaments/list.html", context)
    return redirect(index)