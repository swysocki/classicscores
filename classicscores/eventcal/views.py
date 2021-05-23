from datetime import date
from django.shortcuts import render
from calendar import HTMLCalendar
from .models import Event


def get_next_calendar(year, month):
    if month == 12:
        return date(year + 1, 1, 1)
    return date(year, month + 1, 1)


def get_previous_calendar(year, month):
    if month == 1:
        return date(year - 1, 12, 1)
    return date(year, month - 1, 1)


def events(request, year=date.today().year, month=date.today().month):
    event_nav = {
        "current": date(year, month, 1),
        "previous": get_previous_calendar(year, month),
        "next": get_next_calendar(year, month),
    }
    event_list = Event.objects.filter(start_date__year=year, start_date__month=month)
    context = {"result": event_list, "event_nav": event_nav}
    return render(request, "eventcal/events.html", context)
