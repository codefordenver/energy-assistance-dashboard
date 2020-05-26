from pydantic import BaseSettings

class Settings(BaseSettings):
    hostname: str 
    port: int
    password: str

    class Config:
        env_file = ".env"