
from utils.config import Settings
from utils.helper import GetDataFromAirtable






def get_settings() -> Settings:
    return Settings()

settings: Settings = get_settings()


data = GetDataFromAirtable(settings.airtable_api_key)
