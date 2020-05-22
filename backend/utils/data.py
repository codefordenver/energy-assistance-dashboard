# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
import pandas as pd
import numpy as np

def getData(area: str) -> pd.DataFrame:
  # %%
  AREA: str = area
  processedData: pd.DataFrame = pd.DataFrame()
  
  AHS: pd.DataFrame = pd.read_csv("data/ACS-Average-Household-Size.tsv", sep='\t')
  H: pd.DataFrame = pd.read_csv("data/ACS-Households.tsv", sep='\t')
  MHI: pd.DataFrame = pd.read_csv("data/ACS-Median-Household-Income.tsv", sep='\t')
  PB2: pd.DataFrame = pd.read_csv("data/ACS-Pop-below-200.tsv", sep='\t')
  P: pd.DataFrame = pd.read_csv("data/ACS-Population.tsv", sep='\t')
  LEAPP: pd.DataFrame = pd.read_csv("data/CDHS-Leap-Participants.tsv", sep='\t')
  EAP: pd.DataFrame = pd.read_csv("data/EOC-EA-Participants.tsv", sep='\t')
  PES: pd.DataFrame = pd.read_csv("data/EOC-Primary-Energy-Source.tsv", sep='\t')
  UT: pd.DataFrame = pd.read_csv("data/EOC-Utility-Territories.tsv", sep='\t')
  XEAP: pd.DataFrame = pd.read_csv("data/EOC-Xcel-EA-Participants.tsv", sep='\t')

  # %%
  AHS_TYPE: str = "Average Household Size"
  H_TYPE: str = "Households"
  MHI_TYPE: str = "Median Household Income"
  PB2_TYPE: str = "Population below 200% FPL"
  P_TYPE: str = "Population"
  LEAPP_TYPE: str = "LEAP Participants"
  EAP_TYPE: str = "EA Participants"
  PES_TYPE: str = "Primary Energy Source"
  UT_TYPE: str = "Utility Territories"
  XEAP_TYPE: str = "Xcel EA Participants"


  # %%
  HB2_TYPE: str = "Households below 200% FPL"
  HB2_Percent_TYPE: str = "% Households below 200% FPL"
  THA_TYPE: str = "Total Households Assisted"
  THA_Percent_TYPE: str = "% of Households below 200% FPL Assisted"

  # %%
  P: pd.DataFrame = P.loc[P['Area'] == AREA]
  P = P.drop(columns=["Area", "CountyFIPS"])
  P["Type"] = P_TYPE
  P.set_index('Type',inplace=True)

  # %%
  H: pd.DataFrame = H.loc[H['Area'] == AREA]
  H = H.drop(columns=["Area", "CountyFIPS"])
  H["Type"] = H_TYPE
  H.set_index('Type',inplace=True)

  # %%
  AHS: pd.DataFrame = AHS.loc[AHS['Area'] == AREA]
  AHS = AHS.drop(columns=["Area", "CountyFIPS"])
  AHS["Type"] = AHS_TYPE
  AHS.set_index('Type',inplace=True)

  # %%
  MHI: pd.DataFrame = MHI.loc[MHI['Area'] == AREA]
  MHI = MHI.drop(columns=["Area", "CountyFIPS"])
  MHI["Type"] = MHI_TYPE
  MHI.set_index('Type',inplace=True)

  # %%
  PB2: pd.DataFrame = PB2.loc[PB2['Area'] == AREA]
  PB2 = PB2.drop(columns=["Area", "CountyFIPS"])
  PB2["Type"] = PB2_TYPE
  PB2.set_index('Type',inplace=True)

  # %%
  HB2: pd.DataFrame = pd.DataFrame(PB2.loc[PB2_TYPE]/AHS.loc[AHS_TYPE]).transpose()
  HB2["Type"] = HB2_TYPE
  HB2.set_index('Type',inplace=True)
  HB2 = HB2.round(0)
  HB2 = HB2.astype("int")

  # %%
  HB2_Percent: pd.DataFrame = pd.DataFrame(HB2.loc[HB2_TYPE]/H.loc[H_TYPE]).transpose()
  HB2_Percent["Type"] = HB2_Percent_TYPE
  HB2_Percent.set_index('Type',inplace=True)
  HB2_Percent = HB2_Percent.round(2)

  # %%
  EAP: pd.DataFrame = EAP.loc[EAP['Area'] == AREA]
  EAP = EAP.drop(columns=["Area", "CountyFIPS"])
  EAP["Type"] = EAP_TYPE
  EAP.set_index('Type',inplace=True)

  # %%
  LEAPP: pd.DataFrame = LEAPP.loc[LEAPP['Area'] == AREA]
  LEAPP = LEAPP.drop(columns=["Area", "CountyFIPS"])
  LEAPP["Type"] = LEAPP_TYPE
  LEAPP.set_index('Type',inplace=True)

  # %%
  # In order to cast the data as integers and round the numbers properly, the comma needs to be removed from the data
  for year in LEAPP.columns:
      LEAPP[year] = LEAPP[year].str.replace(',','')
  for year in EAP.columns:
      EAP[year] = EAP[year].str.replace(',','')

  # %%
  THA: pd.DataFrame = pd.DataFrame(LEAPP.loc[LEAPP_TYPE].astype(int) + EAP.loc[EAP_TYPE].astype(int)).transpose()
  THA["Type"] = THA_TYPE
  THA.set_index('Type',inplace=True)

  # %%
  THA_Percent: pd.DataFrame = pd.DataFrame(THA.loc[THA_TYPE]/HB2.loc[HB2_TYPE]).transpose()
  THA_Percent["Type"] = THA_Percent_TYPE
  THA_Percent.set_index('Type',inplace=True)
  THA_Percent = THA_Percent.round(2)
  # %%
  processedData: pd.DataFrame = P.append([H, AHS, MHI, HB2, HB2_Percent, EAP, LEAPP, THA, THA_Percent])

  # %%
  return processedData