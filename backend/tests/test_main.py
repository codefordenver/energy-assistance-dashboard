from fastapi.testclient import TestClient
from main import app, county_list
from tests.denver_county import data

client = TestClient(app)


def test_get_counties():
    response = client.get('/counties')
    assert response.status_code == 200
    assert response.json() == {"counties": county_list}

def test_get_county_data():
    response = client.get('/counties/31')
    assert response.status_code == 200
    assert response.json() == data

def test_get_county_data_county_error():
    response = client.get('/counties/RANDOM COUNTY THAT DOES NOT EXIST')
    assert response.status_code == 404
    assert response.json() == {"detail": "County not found in database"}
