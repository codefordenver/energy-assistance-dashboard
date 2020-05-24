#Global Modules
import pandas as pd
from datetime import datetime
from functools import lru_cache
from fastapi import FastAPI, HTTPException

#Custom Modules
from data.counties import county_list
from utils.config import Settings
from utils.data import getData
from utils.redis_helper import RedisHelper

app = FastAPI()

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings: Settings = get_settings()

r = RedisHelper(settings.hostname, settings.port, settings.password)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/counties")
async def counties():
    return {"counties": county_list}

@app.get("/counties/{county_id}")
async def get_county_data(county_id: str):
    if county_id in county_list:
        county: str = county_list[county_id]

        county_cache_exists = r.exists(county)
        if (county_cache_exists == 1 ): # 1 = exists, 0 = does not exist
            county_data = r.getDataFrame(county)
            time = r.get(f'{county}:time')
            return {"data": county_data, "last_updated": time}

        else:
            #Calculate the dataset from raw data
            county_data: pd.DataFrame = getData(county)

            #Save the data to the cache before returning
            r.setDataFrame(county, county_data)
            now = datetime.now()
            current_time = now.strftime("%H:%M:%S")
            time = r.set(f'{county}:time', current_time)

            return {"data": county_data, "last_updated": "Now"}
    
    raise HTTPException(status_code=404, detail="County not found in database")