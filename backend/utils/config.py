from pydantic import BaseSettings


class Settings(BaseSettings):
    redis_hostname: str
    redis_port: int
    redis_password: str
    airtable_api_key: str
    airtable_api_url: str
    start_year: int
    end_year: int

    class Config:
        env_file = ".env"
