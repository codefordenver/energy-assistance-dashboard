# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
import pandas as pd
import numpy as np
import plotly
import plotly.graph_objs as go

def getData(area):
  # %%
  AREA = area
  processedData = pd.DataFrame()

  AHS = pd.read_csv("data/ACS-Average-Household-Size.tsv", sep='\t')
  H = pd.read_csv("data/ACS-Households.tsv", sep='\t')
  MHI = pd.read_csv("data/ACS-Median-Household-Income.tsv", sep='\t')
  PB2 = pd.read_csv("data/ACS-Pop-below-200.tsv", sep='\t')
  P = pd.read_csv("data/ACS-Population.tsv", sep='\t')
  LEAPP = pd.read_csv("data/CDHS-Leap-Participants.tsv", sep='\t')
  EAP = pd.read_csv("data/EOC-EA-Participants.tsv", sep='\t')
  PES = pd.read_csv("data/EOC-Primary-Energy-Source.tsv", sep='\t')
  UT = pd.read_csv("data/EOC-Utility-Territories.tsv", sep='\t')
  XEAP = pd.read_csv("data/EOC-Xcel-EA-Participants.tsv", sep='\t')

  # %%
  AHS_TYPE = "Average Household Size"
  H_TYPE = "Households"
  MHI_TYPE = "Median Household Income"
  PB2_TYPE = "Population below 200% FPL"
  P_TYPE = "Population"
  LEAPP_TYPE = "LEAP Participants"
  EAP_TYPE = "EA Participants"
  PES_TYPE = "Primary Energy Source"
  UT_TYPE = "Utility Territories"
  XEAP_TYPE = "Xcel EA Participants"


  # %%
  HB2_TYPE = "Households below 200% FPL"
  HB2_Percent_TYPE = "% Households below 200% FPL"
  THA_TYPE = "Total Households Assisted"
  THA_Percent_TYPE = "% of Households below 200% FPL Assisted"

  # %%
  P = P.loc[P['Area'] == AREA]
  P = P.drop(columns=["Area", "CountyFIPS"])
  P["Type"] = P_TYPE
  P.set_index('Type',inplace=True)

  # %%
  H = H.loc[H['Area'] == AREA]
  H = H.drop(columns=["Area", "CountyFIPS"])
  H["Type"] = H_TYPE
  H.set_index('Type',inplace=True)

  # %%
  AHS = AHS.loc[AHS['Area'] == AREA]
  AHS = AHS.drop(columns=["Area", "CountyFIPS"])
  AHS["Type"] = AHS_TYPE
  AHS.set_index('Type',inplace=True)

  # %%
  MHI = MHI.loc[MHI['Area'] == AREA]
  MHI = MHI.drop(columns=["Area", "CountyFIPS"])
  MHI["Type"] = MHI_TYPE
  MHI.set_index('Type',inplace=True)

  # # %%
  # data = [go.Bar(x=P.columns, y=P.loc[P_TYPE], name="Total Population")]
  # fig = go.Figure(data)
  # fig.show()

  # %%
  PB2 = PB2.loc[PB2['Area'] == AREA]
  PB2 = PB2.drop(columns=["Area", "CountyFIPS"])
  PB2["Type"] = PB2_TYPE
  PB2.set_index('Type',inplace=True)

  # %%
  HB2 = pd.DataFrame(PB2.loc[PB2_TYPE]/AHS.loc[AHS_TYPE]).transpose()
  HB2["Type"] = HB2_TYPE
  HB2.set_index('Type',inplace=True)
  HB2 = HB2.round(0)
  HB2 = HB2.astype("int")

  # %%
  HB2_Percent = pd.DataFrame(HB2.loc[HB2_TYPE]/H.loc[H_TYPE]).transpose()
  HB2_Percent["Type"] = HB2_Percent_TYPE
  HB2_Percent.set_index('Type',inplace=True)
  HB2_Percent = HB2_Percent.round(2)

  # %%
  EAP = EAP.loc[EAP['Area'] == AREA]
  EAP = EAP.drop(columns=["Area", "CountyFIPS"])
  EAP["Type"] = EAP_TYPE
  EAP.set_index('Type',inplace=True)

  # %%
  LEAPP = LEAPP.loc[LEAPP['Area'] == AREA]
  LEAPP = LEAPP.drop(columns=["Area", "CountyFIPS"])
  LEAPP["Type"] = LEAPP_TYPE
  LEAPP.set_index('Type',inplace=True)

  # %%
  for year in LEAPP.columns:
      LEAPP[year] = LEAPP[year].str.replace(',','')
  for year in EAP.columns:
      EAP[year] = EAP[year].str.replace(',','')

  # %%
  THA = pd.DataFrame(LEAPP.loc[LEAPP_TYPE].astype(int) + EAP.loc[EAP_TYPE].astype(int)).transpose()
  THA["Type"] = THA_TYPE
  THA.set_index('Type',inplace=True)

  # %%
  THA_Percent = pd.DataFrame(THA.loc[THA_TYPE]/HB2.loc[HB2_TYPE]).transpose()
  THA_Percent["Type"] = THA_Percent_TYPE
  THA_Percent.set_index('Type',inplace=True)
  THA_Percent = THA_Percent.round(2)
  # %%
  processedData = P.append([H, AHS, MHI, HB2, HB2_Percent, EAP, LEAPP, THA, THA_Percent])

  # %%
  return processedData