"""Core views: Details on what data to show"""

# Python imports
# Django imports
from django.utils.translation import gettext_lazy as _

# 3rd party apps
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Local app imports
from .serializers import TimesheetSerializer
from .models import Timesheet
from .renderers import CamelCaseRenderer
from .parsers import SnakeCaseParser
from .common import import_to_database


class TimesheetList(APIView):
    """List all timesheets or create a new timesheet"""
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer
    renderer_classes = [CamelCaseRenderer]
    parser_classes = [SnakeCaseParser]

    def get(self, request, format=None):
        timesheets = Timesheet.objects.all()

        """
        When this function is called, it will be slow initially (in milliseconds) as it is creating all of the entries before returning the objects.
        As this will only be called once [unless someone decides to delete the database or all the entries in said database]
        the response will be faster (still in milliseconds) since this function will be skipped
        """
        if len(timesheets) == 0:
            import_to_database()
            timesheets = Timesheet.objects.all()

        serializer = TimesheetSerializer(timesheets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TimesheetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
