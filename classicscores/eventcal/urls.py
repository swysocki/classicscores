from django.urls import converters, path, register_converter

from . import views

urlpatterns = [
    path('', views.events)
]