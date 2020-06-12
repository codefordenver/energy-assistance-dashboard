from utils.data import processData
from tests.denver_county_data import raw
from main import get_raw_data

def test_processData():
  data = get_raw_data()
  returnedData = processData("DENVER COUNTY", data)
  
  returnedData_to_json = returnedData.to_json()

  assert raw == returnedData_to_json