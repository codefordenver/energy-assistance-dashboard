#Global Modules
from typing import Generic
import pandas as pd
from functools import lru_cache
from fastapi import FastAPI, HTTPException

#Custom Modules
from data.counties import county_list
from utils.config import Settings
from utils.data import processData
from utils.redis_helper import RedisHelper
from utils.date_helper import get_current_time

from models.response import GenericResponse, CountyResponse
app = FastAPI()

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings: Settings = get_settings()

r = RedisHelper(settings.hostname, settings.port, settings.password)

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

        county_cache_exists = r.exists(county)
        if (county_cache_exists == 1 ): # 1 = exists, 0 = does not exist
            response.data = r.getDataFrame(county)
            response.last_updated = r.getDataFrame_time(county)
            return response

        else:
            #Calculate the dataset from raw data
            county_data: pd.DataFrame = processData(county)

            #Save the data to the cache before returning
            r.setDataFrame(county, county_data)

            response.data = r.getDataFrame(county)
            response.last_updated = "Now"
            return response
    
    raise HTTPException(status_code=404, detail="County not found in database")

@app.get("/reset-cache")
async def reset_cache() -> GenericResponse:
    response = GenericResponse(message="Cache was reset")
    r.reset_cache()
    return response