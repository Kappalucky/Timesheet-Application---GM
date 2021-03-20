"""Core Forms: Forms for Core functionality object creation"""

from django.forms import ModelForm, fields
from .models import Timesheet


class TimesheetForm(ModelForm):
    """Timesheet creation form"""

    class Meta:
        model = Timesheet
        fields = ('date',
                  'client',
                  'project',
                  'project_code',
                  'first_name',
                  'last_name',
                  'hours',
                  'billable',
                  'billable_rate',
                  )
