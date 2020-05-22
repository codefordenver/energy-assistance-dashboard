from fastapi.testclient import TestClient
from backend.main import app, county_list

client = TestClient(app)


def test_get_counties():
    response = client.get('/counties')
    assert response.status_code == 200
    assert response.json() == {"counties": county_list}
