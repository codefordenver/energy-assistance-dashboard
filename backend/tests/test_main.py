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


html_test = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

    <script type="text/javascript">
        console.log('jq');
        $.getJSON('http://028abbd3.ngrok.io/counties', (response) => {
            console.log(response);
        });

    </script>
</head>
<body>

</body>
</html>

"""