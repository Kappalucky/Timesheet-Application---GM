"""Core Managers: Queryset and managers for manipulating instance data"""

# Python imports
# Django imports
from django.db.models import Manager, Sum
from django.db.models.expressions import ExpressionWrapper
from django.db.models.fields import DecimalField
from django.db.models.query import QuerySet

# 3rd party apps
# Local app imports


class TimesheetQuerySet(QuerySet):
    def is_billable(self):
        return self.filter(billable=True)

    def not_billable(self):
        return self.filter(billable=False)

    def get_total_hours(self):
        return self.aggregate(Sum('hours'))

    def get_total_billable_rate(self):
        return self.aggregate(Sum('billable_rate'))

    def get_total_billable_amount(self):
        return self.aggregate(billable_amount=ExpressionWrapper(Sum('billable_rate') * Sum('hours'), output_field=DecimalField()))


class TimesheetManager(Manager):

    def get_queryset(self):
        return TimesheetQuerySet(self.model, using=self._db)

    def get_total_timesheets(self):
        return self.all().count()

    def get_projects_by_code(self, project_code):
        return self.filter(project_code=project_code)

    def get_timesheet_by_client(self, client):
        return self.filter(client=client)

    def get_timesheet_by_date(self, date):
        return self.filter(date=date)

    def is_billable(self):
        return self.get_queryset().is_billable()

    def not_billable(self):
        return self.get_queryset().not_billable()

    def get_total_hours(self):
        return self.get_queryset().get_total_hours()

    def get_total_billable_rate(self):
        return self.get_queryset().get_total_billable_rate()

    def get_total_billable_amount(self):
        return self.get_queryset().get_total_billable_amount()
