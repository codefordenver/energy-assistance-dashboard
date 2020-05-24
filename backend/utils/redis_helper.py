import redis
import pandas as pd
import json

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
        self.r.set(key, value.to_json())

    def get(self, key:str):
        return self.r.get(key)

    def getDataFrame(self, key:str):
        return json.loads(self.r.get(key))