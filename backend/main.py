#Global Modules
from typing import Generic
import pandas as pd
from functools import lru_cache
from fastapi import FastAPI, HTTPException

#Custom Modules
from backend.middleware import set_cors
from backend.data.counties import county_list
from backend.utils.config import Settings
from backend.utils.data import processData
from backend.utils.helper import RedisHelper, GetDataFromAirtable
from backend.models.response import GenericResponse, CountyResponse

app = FastAPI()
set_cors(app)
 
#Can set flag to 0 and it will skip the data cache for testing
CACHE_DATA_FLAG = 1

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings: Settings = get_settings()
r = RedisHelper(settings.redis_hostname, settings.redis_port, settings.redis_password)


@app.get("/")
async def root() -> GenericResponse:
    response = GenericResponse(message="Hello World")
    return response


@app.get("/counties")
async def counties():
    return {"counties": county_list}


@app.get("/counties/{county_id}")
async def get_county_data(county_id: str) -> CountyResponse:
    response = CountyResponse(message="Returning county data")
    if county_id in county_list:
        county: str = county_list[county_id]
        
        if r.exists(county) & CACHE_DATA_FLAG: # 1 = exists, 0 = does not exist
            response.data = r.getDataFrame(county)
            response.last_updated = r.getDataFrame_time(county)
            return response

        else:
            #Calculate the dataset from raw data
            data = get_raw_data()
            county_data: pd.DataFrame = processData(county, data)

            #Save the data to the cache before returning
            r.setDataFrame(county, county_data)

            response.data = r.getDataFrame(county)
            response.last_updated = "Now"
            return response
    
    raise HTTPException(status_code=404, detail="County not found in database")

def get_raw_data():
    RAW_DATA_KEY = "RAW_DATA_KEY"

    if r.exists(RAW_DATA_KEY) & CACHE_DATA_FLAG:
        return r.getDataFrame(RAW_DATA_KEY)

    else:
        raw_data = GetDataFromAirtable(settings.airtable_api_key)
        r.setDataFrame(RAW_DATA_KEY, raw_data)
        return r.getDataFrame(RAW_DATA_KEY)
    

@app.get("/raw-data")
async def display_raw_data():
    return get_raw_data()

# ! This is for testing and should have some type of protection so the cache cannot be cleared by any user
@app.get("/reset-cache")
async def reset_cache() -> GenericResponse:
    response = GenericResponse(message="Cache was reset")
    r.reset_cache()
    return response