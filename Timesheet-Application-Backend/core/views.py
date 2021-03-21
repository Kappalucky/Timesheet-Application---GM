"""Core views: Details on what data to show"""

# Python imports
from datetime import date

# Django imports
from django.utils import timezone
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.utils.functional import empty
from django.utils.translation import gettext_lazy as _
from django.shortcuts import render

# 3rd party apps
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.serializers import Serializer

# Local app imports
from . import serializers
from .models import Timesheet
from .renderers import CamelCaseRenderer
from .parsers import SnakeCaseParser
from .common import import_to_database


class TimesheetList(APIView):
    """List all timesheets or create a new timesheet"""
    queryset = Timesheet.objects.all()
    serializer_class = serializers.TimesheetSerializer
    renderer_classes = [CamelCaseRenderer]
    parser_classes = [SnakeCaseParser]

    def get(self, request, format=None):
        timesheets = Timesheet.objects.all()

        if len(timesheets) is 0:
            import_to_database()
            timesheets = Timesheet.objects.all()

        serializer = serializers.TimesheetSerializer(timesheets, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.TimesheetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
