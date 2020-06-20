from pydantic import BaseSettings

class Settings(BaseSettings):
    hostname: str 
    port: int
    password: str
    airtable_api_key: str

    class Config:
        env_file = ".env"