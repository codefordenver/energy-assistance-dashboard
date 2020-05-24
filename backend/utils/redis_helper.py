import json
import pandas as pd
import redis
from utils.date_helper import get_current_time

class RedisHelper():
    def __init__(self, hostname, port, password):
        self.r = redis.Redis(
            host=hostname,
            port=port, 
            password=password)
    
    def exists(self, key:str) -> int:
        return self.r.exists(key)
    
    def set(self, key:str, value:str):
        self.r.set(key, value)

    def setDataFrame(self, key:str, value: pd.DataFrame):
        current_time = get_current_time()
        #Create a pipeline with multiple transactions for data and time
        p = self.r.pipeline()
        p.multi()

        #Set data and time
        p.set(key, value.to_json())
        p.set(f'{key}:time', current_time)

        #Execute both transactions
        p.execute()

    def get(self, key:str):
        return self.r.get(key)

    def getDataFrame(self, key:str):
        return json.loads(self.r.get(key))

    def getDataFrame_time(self, key:str):
        return self.r.get(f'{key}:time')
    
    def reset_cache(self):
        self.r.flushdb()