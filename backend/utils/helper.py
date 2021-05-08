import json
import pandas as pd
import redis
from datetime import datetime, date
import requests
import time
from fastapi import HTTPException
import collections
from backend.utils.constants import ROW_TYPE
import numpy as np


class RedisHelper():
    def __init__(self, hostname, port, password):
        self.r = redis.Redis(
            host=hostname,
            port=port,
            password=password)

    def exists(self, key: str) -> int:
        return self.r.exists(key)

    def set(self, key: str, value: str):
        self.r.set(key, value)

    def getCurrentTime(self):
        now = datetime.now()
        return now.strftime("%H:%M:%S")

    def setDataFrame(self, key: str, value: pd.DataFrame):
        current_time = self.getCurrentTime()
        # Create a pipeline with multiple transactions for data and time
        p = self.r.pipeline()
        p.multi()

        # Set data and time
        p.set(key, value.to_json())
        p.set(f'{key}:time', current_time)

        # Execute both transactions
        p.execute()

    def get(self, key: str):
        return self.r.get(key)

    def getDataFrame(self, key: str):
        return json.loads(self.r.get(key))

    def getDataFrame_time(self, key: str):
        return self.r.get(f'{key}:time')

    def reset_cache(self):
        self.r.flushdb()


def GetDataFromAirtable(api_url: str, api_key: str, end_year: int):
    """

    :return: a dataframe

    This function uses REST API get method to fetch the data from airtable
    data from all the files is combined into a dataframe and returned
    """
    # list of filename from Airtable
    # skipping these 2 files as of now --> "EOC - Utility Territories.csv","EOC - Primary Energy Sources.csv",

    url = api_url
    params = {'api_key': api_key}

    AirtableFileNames = {
        "EOC - EA Participants": ROW_TYPE["XEAP_TYPE"],
        "CDHS - LEAP Participants": ROW_TYPE["LEAPP_TYPE"],
        "EOC - EA Participants": ROW_TYPE["EAP_TYPE"],
        "ACS - Population below 200 Percent FPL": ROW_TYPE["PB2_TYPE"],
        "ACS - Average Household Size":  ROW_TYPE["AHS_TYPE"],
        "ACS - Median Household Income": ROW_TYPE["MHI_TYPE"],
        "ACS - Households": ROW_TYPE["H_TYPE"],
        "ACS - Population": ROW_TYPE["P_TYPE"]}

    tableDict = collections.defaultdict(dict)

    start_year = 2010 #Needs to be hard coded unless loop is updated to check start column

    index = 0
    # loop through all the files on Airtable
    for fileName in AirtableFileNames:
        url = "https://api.airtable.com/v0/appfSbArpaXGKBjzU/"
        url = url + fileName

        response = requests.get(url, params=params)
        # if response code is 200, i.e if it is a success
        if response.status_code == 200:

            response_json = json.loads(response.content.decode('utf-8'))

            counter = 0

            tableDict[index] = []
            length_data = len(response_json['records'])

            # loop through entire length of json response
            for counter in range(length_data):
                single = {}

                single.update({'TABLE': fileName})
                single.update({'Type': AirtableFileNames[fileName]})
                try:
                    single.update({'Area': response_json['records'][counter]['fields']['Area'],
                                   'CountyFIPS': int(response_json['records'][counter]['fields']['CountyFIPS'])})
                except:
                    # in case no data available simply continue to next iteration as either area and CountyFIPS
                    # is missing then don't include that record
                    continue

                # loop from 2010 till current year to get data
                for i in range(start_year, end_year):
                    try:
                        single.update({str(i): convert_string_to_float(
                            response_json['records'][counter]['fields'][str(i)])})
                    except:
                        # Setting value to 0 for now to be able to process the data frame

                        # single.update({str(i): 0})
                        continue

                # add this single record to the default dictionary
                tableDict[index] = single

                index = index + 1

            time.sleep(0.25)

        else:
            # raise exception if some error in fetching the file and response code is not 200
            raise HTTPException(
                status_code=404, detail="Table not found in Airtable database")

    # Put the default dictionary into dataframe
    data = pd.DataFrame(tableDict)
    # transpose the table
    data = data.transpose()
    # set the index
    #data = data.set_index(['TYPE', 'CountyFIPS'])
    return data


def convert_string_to_float(string: str):
    converted_string = string.replace(',', '')
    return float(converted_string)
