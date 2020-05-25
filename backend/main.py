from fastapi import FastAPI, HTTPException
from middleware import set_cors
from data.counties import county_list
from utils.data import getData
import pandas as pd

app = FastAPI()
set_cors(app)


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
        county_data: pd.DataFrame = getData(county)
        return {"data": county_data}
    
    raise HTTPException(status_code=404, detail="County not found in database")
