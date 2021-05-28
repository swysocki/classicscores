from datetime import date
from django.core.paginator import Paginator
from django.shortcuts import render
from calendar import HTMLCalendar
from .models import Event

from loguru import logger

def events(request, year=date.today().year, month=date.today().month):
    event_list = Event.objects.filter(start_date__gte=date(year, month, 1)).order_by('start_date')
    paginator = Paginator(event_list, 2)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    logger.debug(page_obj)
    logger.debug(f"record count: {len(event_list)}")
    context = {"result": page_obj}
    return render(request, "eventcal/events.html", context)
