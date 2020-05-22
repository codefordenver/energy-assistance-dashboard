from fastapi import FastAPI
from backend.data.counties import county_list

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/counties")
async def counties():
    return {"counties": county_list}

@app.get("/counties/{county}")
async def get_county_data(county: str):
    return {"message": f"Return specific county data here here for {county}!"}