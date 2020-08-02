import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "../../components/Loader";
import SummaryTable from "../../components/SummaryTable";
import CountyDropdown from "../../components/CountyDropdown";
import ParetoChart from "../../components/ParetoChart";
import HouseholdsAssisted from "../../components/HouseholdsAssisted";
import ParticipantsChart from "../../components/ParticipantsChart";
import FullStats from "../../components/FullStats";
import styles from "../../styles/global.module.css";
import { BACKEND_URL } from "../../utils/constants";

export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

// TODO: Refactor counties function so that the counties/[id].js files is used to determine the count instead of the query.

async function fetcher(path) {
  //https://next-site-git-new-docs.zeit.now.sh/docs/basic-features/data-fetching
  //req to GET the selected counties data
  const countyDataRes = await fetch(`${BACKEND_URL}/counties/${path}`);
  const countyData = await countyDataRes.json();
  return countyData
}

function Counties(props) {
  const { countyList } = props;

  const [selectedCountyUpdated, setSelectedCountyUpdated] = useState(null);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { name } = router.query;

  const countyId = getKeyByValue(countyList.counties, name);
  const { data, error } = useSWR(countyId, fetcher);

  const county = data;

  return (
    <div className={styles.container}>
      <div className={styles["overview"]}>
        <div>
          <h1 className={styles["print-title"]}>
            Colorado Low Income <br />
            Energy Stats
          </h1>
          <div className={styles["print-report"]}>
            <span className={styles["print-label"]}>Report for:</span>
            <CountyDropdown countyList={countyList} setLoading={setLoading} />
          </div>
        </div>
        <img
          src='/energy-outreach-logo.png'
          alt='Energy Outreach Colorado Logo'
          className={styles["eoc-logo"]}
        />
      </div>
      {!county ? (
        <Loader />
      ) : error ? (
        <h3 className={styles["error-text"]}>
          The selected county could not be found, please try another.
        </h3>
      ) : (
        <div>
          <div>
            <SummaryTable selectedCountyData={county.data} />
            <FullStats selectedCountyData={county.data} />
          </div>

          <div className={styles.charts}>
            <h3>Historical Trends</h3>
            <div className={styles["historical-trends-charts"]}>
              <ParetoChart
                barKey='Households below 200% FPL'
                lineKey='Total Households Assisted'
                selectedCountyData={county.data}
              />
              <ParetoChart
                barKey='% Households below 200% FPL'
                lineKey='% of Households below 200% FPL Assisted'
                selectedCountyData={county.data}
              />
            </div>
            <div className={styles["historical-trends-charts"]}>
              <HouseholdsAssisted
                title='% of Households below 200% FPL Assisted'
                selectedCountyData={county.data}
              />
              <ParticipantsChart selectedCountyData={county.data} />
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

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #e6e6e6;
        }
        * {
          box-sizing: border-box;
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

  return {
    countyList: countyList,
    query: query,
  };
};

export default Counties;
