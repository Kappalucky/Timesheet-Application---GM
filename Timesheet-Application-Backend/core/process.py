import csv
from .models import Timesheet

csv_path = 'Timesheet-Application-Backend/GM_Coding_Exercise_Sample_Data.csv'


def import_to_database():
    reader = csv.DictReader(open(csv_path), delimiter=',')
    for row in reader:
        timesheet = Timesheet(date=row['Date'],
                              client=row['Client'],
                              project=row['Project'],
                              project_code=row['Project Code'],
                              hours=row['Hours'],
                              billable=row['Billable'],
                              first_name=row['First Name'],
                              last_name=row['Last Name'],
                              billable_rate=row['Billable Rate'],
                              )

        timesheet.save()
