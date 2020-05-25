from utils.data import processData
from tests.denver_county_data import raw

def test_processData():
  returnedData = processData("DENVER COUNTY")
  
  returnedData_to_json = returnedData.to_json()

  assert raw == returnedData_to_json