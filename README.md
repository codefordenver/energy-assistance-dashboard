# ENERGY OUTREACH COLORADO
### KNOW THE TRUE LEVEL OF ENERGY NEED IN CO

The Energy Assistance Dashboard is an interactive single-page web
application for visualizing and tracking data related to low-income
energy assistance through [Energy Outreach Colorado](https://www.energyoutreach.org/).

The purpose of the dashboard is to provide an understanding of how
much energy need is in a specific place.

## About
### How It Works
There are really two parts to this web application:

1. The first part is the user-facing side, which is a web page that
   displays a dashboard of energy visualizations. The design of this
   dashboard will be based on the version 1 visualization mockup
   found in the Google Sheet below: [1].

2. The other part is the admin-facing side, which is an
   [Airtable](https://airtable.com) document that stores the data
   which feeds the user-facing visualizations. Currently, the data
   can also be found in the Google Sheet below: [1].

The idea is that administrators will be able to easily update
the Airtable document and users will see changes reflected in the web
dashboard.

### Project Goals
The must haves of the project are that it:

1. Is printable.
2. Easily used by non-technical users. This can be interpreted in two ways. One is just being able to provide a link to someone and then they have something they can reference and easily print out. The other way is whoever works

Stretch goal ideas:
* Automating data collection
* Add more types of data

### Resources

- [1]: Version 1 visualization mockup and data can be found in this
  Google Sheet: [Colorado Low Income Energy Stats](https://docs.google.com/spreadsheets/u/3/d/1e6nSz5Mw8kloFNkSN-xi2IjnSP_pclgJy7U1C1fBx68/edit?usp=sharing)
  - The first page, titled `County Lookup - Report View` is the
    visualization dashboard that we will be re-building as a web page
  - Other pages contain data that will feed the dashboard

- [2]: Pitch Slides: https://docs.google.com/presentation/d/1_J7BpB2Spzu1cWV8QD1gIGR2H1vUTuCrK4WGlpoAk9A

## Development
On the technology side, the project is split into two parts, a backend
HTTP API and a web frontend. The backend API is being built with
Python 3.6+ and [FastAPI](https://fastapi.tiangolo.com/). The
frontend stack is still being decided.

### Backend Setup
1. Install python3

2. Navigate to the project folder and setup a virtual environment named `venv` by running the command:
`python3 -m venv venv`

3. Activate the virtual environment:
Find the proper activate script based on your OS and terminal.  https://docs.python.org/3/library/venv.html

   - For macOS terminal use: `source venv/bin/activate`

   - Note: For macOS the venv can be deactivated by typing `deactivate` in the terminal

4. Navigate to the `backend` folder

5. Install dependencies:
`pip install -r requirements.txt`

6. If adding new dependencies, update the requirements file by running:
`pip-chill > requirements.txt`

   - We are using [`pip-chill`](https://pypi.org/project/pip-chill/) which will only list top-level requirements.

7. Start the server
`uvicorn main:app --reload`

8. Navigate to `http://127.0.0.1:8000/` to view the server locally

### Frontend Setup
TBD