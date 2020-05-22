from fastapi import FastAPI, HTTPException
from data.counties import county_list
from utils.data import getData
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/counties")
async def counties():
    return {"counties": county_list}

@app.get("/counties/{county}")
async def get_county_data(county: str):
    county = county.upper()
    if county in county_list.values():
        county_data = getData(county)
        return {"data": county_data}
    
    raise HTTPException(status_code=404, detail="County not found in database")