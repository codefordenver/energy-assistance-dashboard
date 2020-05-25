from fastapi.testclient import TestClient
from fastapi import FastAPI
from middleware import set_cors
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


def test_cors():
    # start the sever
    cors_app = FastAPI()

    # cors hasn't been set yet
    assert cors_app.user_middleware == []

    # set cors
    set_cors(cors_app)

    assert cors_app.user_middleware != []

    # For now, there is only one middleware set up, but this should work for multiple
    expected_mw_options: dict = {'allow_origins': ['*'], 'allow_credentials': True}
    mw_options = [m.options for m in cors_app.user_middleware]
    assert expected_mw_options in mw_options
