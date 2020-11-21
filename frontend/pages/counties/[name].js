import { useState } from "react";

import Loader from "../../components/Loader";
import SummaryTable from "../../components/SummaryTable";
import CountyDropdown from "../../components/CountyDropdown";
import ParetoChart from "../../components/ParetoChart";
import HouseholdsAssisted from "../../components/HouseholdsAssisted";
import ParticipantsChart from "../../components/ParticipantsChart";
import FullStats from "../../components/FullStats";
import StateMap from "../../components/StateMap";
import styles from "../../styles/global.module.css";
import { BACKEND_URL } from "../../utils/constants";

export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

// TODO: Refactor counties function so that the counties/[id].js files is used to determine the count instead of the query.

function Counties(props) {
  const { countyList, county } = props;
  const selectedCountyData = county.data;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles["overview"]}>
        <div className={styles["title-container"]}>
          <div className={styles["print-report"]}>
            <span className={styles["print-label"]}>Report for:</span>
            <CountyDropdown countyList={countyList} setLoading={setLoading} />
            {!loading && selectedCountyData && !error && (
              <SummaryTable selectedCountyData={selectedCountyData} />
            )}
          </div>
          {!loading && selectedCountyData && !error && (
            <div className={styles["map-container"]}>
              <StateMap countyId={county.id} />
            </div>
          )}
        </div>
      </div>
      <div className={styles["data-container"]}>
        {loading || !selectedCountyData ? (
          <Loader />
        ) : error ? (
          <h3 className={styles["error-text"]}>
            The selected county could not be found, please try another.
          </h3>
        ) : (
          <div>
            <div>
              <FullStats selectedCountyData={selectedCountyData} />
            </div>

            <div className={styles.charts}>
              <h3>Historical Trends</h3>
              <div className={styles["historical-trends-charts"]}>
                <ParetoChart
                  barKey='Households below 200% FPL'
                  lineKey='Total Households Assisted'
                  selectedCountyData={selectedCountyData}
                />
                <ParetoChart
                  barKey='% Households below 200% FPL'
                  lineKey='% of Households below 200% FPL Assisted'
                  selectedCountyData={selectedCountyData}
                />
              </div>
              <div className={styles["historical-trends-charts"]}>
                <HouseholdsAssisted
                  title='% of Households below 200% FPL Assisted'
                  selectedCountyData={selectedCountyData}
                />
                <ParticipantsChart selectedCountyData={selectedCountyData} />
              </div>
            </div>

            <div className={styles.sources}>
              <h4>Sources</h4>
              <p>
                American Community Survey 5-Year Estimates by the Census Bureau,
                Energy Outreach Colorado's households served, and CDHS LEAP
                households served
              </p>
              <p>2013 LEAP data is estimated due to lack of data</p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #e6e6e6;
        }

        polygon {
          fill: blue;
          fill-opacity: 1;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
        .rv-xy-plot__axis__line {
          fill: none;
          stroke-width: 2px;
          stroke: #e6e6e9;
        }
        .rv-xy-plot__axis__tick__line {
          stroke: #e6e6e9;
        }
        .rv-xy-plot__axis__tick__text {
          fill: #6b6b76;
          font-size: 11px;
        }
        .rv-xy-plot__grid-lines__line {
          stroke: #e6e6e9;
        }
        .rv-xy-plot__series rv-xy-plot__series--bar rect {
          border-top-left: 3px;
        }
        .rv-discrete-color-legend {
          box-sizing: border-box;
          overflow-y: auto;
          font-size: 12px;
          padding-top: 12px;
        }
        .rv-discrete-color-legend-item {
          color: #3a3a48;
          border-radius: 1px;
          padding: 0px 18px 2px;
        }
        .rv-discrete-color-legend-item.horizontal {
          display: inline-block;
        }
        .rv-discrete-color-legend-item.horizontal
          .rv-discrete-color-legend-item__title {
          display: inline;
          padding-left: 10px;
        }
        .rv-discrete-color-legend-item.vertical
          .rv-discrete-color-legend-item__title {
          display: inline;
          padding-left: 10px;
        }
        .rv-discrete-color-legend-item__color {
          display: inline-block;
          vertical-align: middle;
          overflow: visible;
        }
        .rv-discrete-color-legend-item__color__path {
          stroke: #dcdcdc;
          stroke-width: 2px;
        }
        .rv-xy-plot__axis__tick__text {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}

Counties.getInitialProps = async ({ query }) => {
  //req to GET all counties
  const countyListRes = await fetch(`${BACKEND_URL}/counties`);
  const countyList = await countyListRes.json();

  //req to GET the selected counties data
  const countyName = query.name;
  const countyId = getKeyByValue(countyList.counties, countyName);

  const countyDataRes = await fetch(`${BACKEND_URL}/counties/${countyId}`);
  const countyData = await countyDataRes.json();

  return {
    countyList: countyList,
    query: query,
    county: {
      id: countyId,
      name: countyName,
      data: countyData.data,
    },
  };
};

export default Counties;
