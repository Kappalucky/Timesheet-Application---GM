# Timesheet-Application-GM

Welcome to the **Timesheet Application** codebase. I ([@kappalucky](https://github.com/kappalucky)) am the original creator. You are more than welcomed to make use of the codebase, but be sure to follow the licensing details. This program is based on the requirements given by Giant Machines.

### Built with:

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Vue.js](https://vuejs.org/)

## Getting Started

#### Prerequisites

Backend:
- [Python 3.0+](https://www.python.org/)
- [Pip3](https://pypi.org/project/pip/)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/)

Frontend:
- [Node](https://nodejs.org/en/)
- [Vue.js](https://vuejs.org/)

#### Installation


All instructions for the frontend and backend are in their own readme files within their own file structure...but if you're feeling lazy, I also included the instructions for both below. The instructions are based on a MacOs/Unix/Linux environment. I'm sorry windows developers 😣

1.  Clone repository
#### Within Timesheet-Application-GM/Timesheet-Application-Backend

2.  Install backend prerequisites if you have not already
3.  Create a Virtualenv environment
```
virtualenv venv
```
4.  Activate environment
```
source venv/bin/activate
```
5.  Install requirements file from repository
```
pip3 install -r requirements.txt
```
6.  (./manage.py or Python3 manage.py) Makemigrations and migrate to Django provided SQLite database or Postgres if you have the time
```
python3 manage.py makemigrations
python3 manage.py migrate
```
7.  Create Superuser for testing on local machine (No need to if you're simply calling the api and don't care to see all the data or change it)
```
python3 manage.py createsuperuser
```
8.  Run the development server before running the frontends server. It is best to use localhost:8000. If not you will have to change the url within services/api.js of the front end main folder
```
python3 manage.py runserver
```

#### Within Timesheet-Application-GM/Timesheet-Application-Frontend

9.   Install frontend prerequisites if you have not already
10.  Navigate to timesheet folder (`cd`)
11.  call npm install to begin installation of all package requirements
```
npm install
```
12.  call npm run serve to start development server
```
npm run serve
```

## License

This program is free software and can be redistributed and/or modified under the terms of the GNU General Public License v3.0 as published by the Free Software Foundation. Please refer to [LICENSE](https://github.com/Kappalucky/TransportLLC-backend/blob/master/LICENSE) file for full details.

If you have any questions related to anything about the project, licensing or contributions, email Shaquille.j.foster@gmail.com

## Need Help?

No matter the issue or question. Simply mention (@kappalucky) in an issue and expect a response as soon as I can get back to you or shoot me an email at Shaquille.j.foster@gmail.com
