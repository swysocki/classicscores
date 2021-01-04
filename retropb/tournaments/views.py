from django.shortcuts import render, redirect
from tournaments.models import Tournament, Score

COMPONENTS = ['year', 'league']
FIELD_NAMES = {
    'year': 'tournament__year',
    'league': 'tournament__league'
}


def index(request, component=None):
    if component in COMPONENTS:
        result = Tournament.objects.values(component).distinct().order_by(component)
        context = {component: result, 'component': component}
        return render(request, 'tournaments/index.html', context)
    if component == 'search':
        return render(request, 'tournaments/index.html', {'component': component})
    years = Tournament.objects.values('year').distinct().order_by('year')
    leagues = Tournament.objects.values('league').distinct()
    context = {'year': years, 'league': leagues}
    return render(request, 'tournaments/index.html', context)


def component(request, component, query):
    if component in COMPONENTS:
        result = Score.objects.filter(**{FIELD_NAMES.get(component): query})
        context = {'result': result}
        return render(request, 'tournaments/list.html', context)
    return redirect(index)


def search(request):
    search_string = request.POST.get('team')
    if search_string:
        result = Score.objects.filter(team__icontains=search_string)
        context = {'result': result}
        return render(request, 'tournaments/list.html', context)
    return redirect(index)