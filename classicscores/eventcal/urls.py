from django.urls import converters, path, register_converter

from . import views

class FourDigitYearConverter:
    regex = '[0-9]{4}'

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return '%04d' % value

class TwoDigitMonthConverter:
    regex = '(0?[1-9]|1[012])'
    # regex = '10'

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return '%02d' % value

register_converter(FourDigitYearConverter, 'yyyy')
register_converter(TwoDigitMonthConverter, 'mm')

urlpatterns = [
    path('', views.events),
    path('<yyyy:year>/<mm:month>', views.events, name='eventlist')
]