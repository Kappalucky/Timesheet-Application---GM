"""Core serializers: Functions to change json to python readable format"""

# Python imports
# Django imports
# 3rd party apps
from rest_framework import serializers

# Local app imports
from .models import Timesheet


class TimesheetSerializer(serializers.Serializer):
    """Serializes Timesheet data"""

    class Meta:
        model = Timesheet
        fields = ('id', 'first_name', 'last_name', 'client', 'project',
                  'project_code', 'hours', 'billable', 'billable_rate', 'date',)
        read_only_fields = ('created', 'last_updated',)
