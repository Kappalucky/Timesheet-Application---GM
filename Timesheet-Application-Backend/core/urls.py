"""Core urls: API urls"""

# Python imports
# Django imports
from django.urls import path

# 3rd party apps
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

# Local app imports
from . import views

app_name = 'core'

urlpatterns = [
    path('timesheets/', views.TimesheetList.as_view(),
         name='timesheets_list'),
]
