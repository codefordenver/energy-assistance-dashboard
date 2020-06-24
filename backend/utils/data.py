import pandas as pd
from backend.utils.constants import ROW_TYPE

def processData(area: str, data) -> pd.DataFrame:
  AREA: str = area
  DATA = pd.DataFrame(data)
  DATA = DATA.loc[DATA['Area'] == AREA]
  DATA = DATA.drop(columns=["TABLE", "Area", "CountyFIPS"])
  DATA.set_index('Type',inplace=True)

  HB2_TYPE: str = "Households below 200% FPL"
  HB2_Percent_TYPE: str = "% Households below 200% FPL"
  THA_TYPE: str = "Total Households Assisted"
  THA_Percent_TYPE: str = "% of Households below 200% FPL Assisted"

  HB2: pd.DataFrame = pd.DataFrame(DATA.loc[ROW_TYPE["PB2_TYPE"]]/DATA.loc[ROW_TYPE["AHS_TYPE"]]).transpose()
  HB2["Type"] = HB2_TYPE
  HB2.set_index('Type',inplace=True)
  HB2 = HB2.astype(float).round(0)

  HB2_Percent: pd.DataFrame = pd.DataFrame(HB2.loc[HB2_TYPE]/DATA.loc[ROW_TYPE["H_TYPE"]]).transpose()
  HB2_Percent["Type"] = HB2_Percent_TYPE
  HB2_Percent.set_index('Type',inplace=True)
  HB2_Percent = HB2_Percent.astype(float).round(2)

  THA: pd.DataFrame = pd.DataFrame(DATA.loc[ROW_TYPE["LEAPP_TYPE"]].astype(int) + DATA.loc[ROW_TYPE["EAP_TYPE"]].astype(int)).transpose()
  THA["Type"] = THA_TYPE
  THA.set_index('Type',inplace=True)

  THA_Percent: pd.DataFrame = pd.DataFrame(THA.loc[THA_TYPE]/HB2.loc[HB2_TYPE]).transpose()
  THA_Percent["Type"] = THA_Percent_TYPE
  THA_Percent.set_index('Type',inplace=True)
  THA_Percent = THA_Percent.astype(float).round(2)

  processedData: pd.DataFrame = DATA.append([HB2, HB2_Percent, THA, THA_Percent])

  return processedData