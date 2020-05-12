from flask import Flask, render_template, request
from utils.data import getData
import plotly
import plotly.graph_objs as go
import pandas as pd
import numpy as np
import json

app = Flask(__name__)


def create_plot(feature):
  #TODO Basic data plot to be replaced with data from the CountyData table
  N = 40
  x = np.linspace(0, 1, N)
  y = np.random.randn(N)
  df = pd.DataFrame({'x': x, 'y': y})

  data = [
      go.Bar(x=df['x'],
              y=df['y'])
  ]

  graphJSON = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)
  return graphJSON


def countyTemplate(countyData):
    bar1 = create_plot("Bar")
    bar2 = create_plot("Bar")
    return render_template('index.jinja', countyData=countyData.to_html(classes="table", border=0), plot1=bar1, plot2=bar2)


@app.route("/")
def index():
    countyData = getData("DENVER COUNTY")

    return countyTemplate(countyData)


@app.route("/county", methods=['GET', 'POST'])
def change_county():
    county = request.args['selected']
    countyData = getData(county)

    return countyTemplate(countyData)


if __name__ == "__main__":
    app.run()
