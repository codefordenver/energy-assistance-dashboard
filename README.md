# ENERGY OUTREACH COLORADO
### KNOW THE TRUE LEVEL OF NEED IN CO

The general idea of the project is to provide an understanding of how much need is in a specific place.

The must haves of the project are that it:

1. Is printable. 
2. Easily used by non-technical users. This can be interpreted in two ways. One is just being able to provide a link to someone and then they have something they can reference and easily print out. The other way is whoever works

Stretch goal ideas:
* Automating data collection
* Add more types of data

## Backend Setup
1. Install python3

2. Setup a virtual environment named venv by running the command:
`python3 -m venv venv`

3. Activate the virtual environment:
Find the proper activate script based on your OS and terminal.  https://docs.python.org/3/library/venv.html

- For macOS terminal use: `source venv/bin/activate`

- Note: For macOS the venv can be deactivated by typing `deactivate` in the terminal

4. Install dependencies:
`pip install -r requirements.txt`

5. If adding new dependencies, update the requirements file by running:
`pip freeze > requirements.txt`
