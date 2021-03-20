# Timesheet-Application-GM-Backend

This folder contains the Django built backend for the Timesheet application

## Getting Started

This is the general starting point as of right now. More detailed documentation to be written soon.

#### Prerequisites

- [Python 3.0+](https://www.python.org/)
- [Pip3](https://pypi.org/project/pip/)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/)

#### Installation

1.  Install prerequisites if you have not already
2.  Create a Virtualenv environment
```
virtualenv venv
```
3.  Activate environment
```
source venv/bin/activate
```
4.  Change directory `cd` to repository folder then install requirements file from repository
```
pip3 install requirements.txt
```
5.  (./manage.py) Makemigrations and migrate to Django provided SQLite database or Postgres if you have the time
6.  Create Superuser for testing on local machine