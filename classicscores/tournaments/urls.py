from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<component>', views.index, name='indexd'),
    path('<component>/<query>/', views.component, name='component'),
    path('search/', views.search, name='search')
]