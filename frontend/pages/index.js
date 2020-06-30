import Head from "next/head";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import Loader from "../components/Loader";
import SummaryTable from "../components/SummaryTable";
import CountyDropdown from "../components/CountyDropdown";
import ParetoChart from "../components/ParetoChart";
import HouseholdsAssisted from "../components/HouseholdsAssisted";
import ParticipantsChart from "../components/ParticipantsChart";
import styles from "../styles/global.module.css";

const frontendUrl = "https://energy-assistance-dashboard.herokuapp.com";

function Index(props) {
  const [selectedCountyData, setSelectedCountyData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const countyQuery = router.query.county;

  //req to GET specific county data
  const getCountyData = async (id = "0") => {
    setLoading(true);
    const res = await fetch(`${frontendUrl}/counties/${id}`);
    const data = await res.json();

    if (res.ok) {
      setSelectedCountyData(data.data);
      setError(null);
    } else {
      setError(res.status);
    }

    Router.push({ pathname: "/", query: { county: id } });
    setLoading(false);
  };

  const getCountyId = (e) => {
    e.preventDefault();
    const id = e.target.value;
    getCountyData(id);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles["print-title"]}>
          The selected county could not be found, please try another.
        </h1>
        <CountyDropdown
          countyList={props.countyList}
          getCountyId={getCountyId}
          selectedCountyId={countyQuery}
        />
      </div>
    );
  }

  if (!selectedCountyData) {
    getCountyData(countyQuery);
  } else
    return (
      <div className={styles.container}>
        <Head>
          <title className='print-title'>Energy Assistance Dashboard</title>
          <link rel='icon' href='/favicon.png' />
        </Head>

        <main>
          <div className={styles["overview"]}>
            <div>
              <h1 className={styles["print-title"]}>
                Colorado Low Income Energy Stats
              </h1>
              <CountyDropdown
                countyList={props.countyList}
                getCountyId={getCountyId}
                selectedCountyId={countyQuery}
              />

              <SummaryTable selectedCountyData={selectedCountyData} />
            </div>
            <img
              src='/energy-outreach-logo.png'
              alt='Energy Outreach Colorado Logo'
              className={styles["eoc-logo"]}
            />
          </div>

          <div>Place full stats table here!</div>

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
            <p>Data Last Updated: {selectedCountyData.last_updated}</p>
          </div>
        </main>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
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
          }
          .rv-discrete-color-legend-item {
            color: #3a3a48;
            border-radius: 1px;
            padding: 9px 10px;
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
        `}</style>
      </div>
    );
}

Index.getInitialProps = async () => {
  //req to GET all counties
  const countyRes = await fetch(`${frontendUrl}/counties`);
  const countyList = await countyRes.json();

  return {
    countyList: countyList,
  };
};

export default Index;
