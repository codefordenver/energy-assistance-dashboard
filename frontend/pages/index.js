import Head from 'next/head'
import SummaryTable from '../components/SummaryTable';
import CountyDropdown from '../components/CountyDropdown';
import ParetoChart from '../components/ParetoChart';
import HouseholdsAssisted from '../components/HouseholdsAssisted';
import ParticipantsChart from '../components/ParticipantsChart';
import FullStats from '../components/FullStats';
import styles from '../styles/global.module.css'

const backendURL = 'https://energy-assistance-dashboard.herokuapp.com';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedCountyData: this.props.selectedCountyData
    };
  }

  getCountyId = (e) => {
    e.preventDefault();
    const id = e.target.value;
    fetch(`${backendURL}/counties/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          selectedCountyData: data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const selectedCountyData = this.state.selectedCountyData.data
    return (
      <div className={styles.container}>
        <Head>
          <title className="print-title">Energy Assistance Dashboard</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <main>
          <div className={styles['overview']}>
            <div>
              <h1 className={styles['print-title']}>Colorado Low Income Energy Stats</h1>
              <CountyDropdown 
                countyList={this.props.countyList} 
                getCountyId={this.getCountyId}
              />
              <SummaryTable 
                selectedCountyData={selectedCountyData} 
              />
            </div>
            <img src="/energy-outreach-logo.png" alt="Energy Outreach Colorado Logo" className={styles['eoc-logo']} />
          </div>

          <div>
            <FullStats 
               selectedCountyData={selectedCountyData} 
            />
          </div>

          <div className={styles.charts}>
            <h3>Historical Trends</h3>
            <div className={styles['historical-trends-charts']}>
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
            <div className={styles['historical-trends-charts']}>
              <HouseholdsAssisted 
                title='% of Households below 200% FPL Assisted'
                selectedCountyData={selectedCountyData}
              />
              <ParticipantsChart
                selectedCountyData={selectedCountyData}
              />
            </div>
          </div>

          <div className={styles.sources}>
            <h4>Sources</h4>
            <p>American Community Survey 5-Year Estimates by the Census Bureau, Energy Outreach Colorado's households served, and CDHS LEAP households served</p>
            <p>2013 LEAP data is estimated due to lack of data</p>
            <p>Data Last Updated:  { this.state.selectedCountyData.last_updated }</p>
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

          .rv-discrete-color-legend-item.horizontal .rv-discrete-color-legend-item__title {
            display:inline;
            padding-left: 10px;
          }

          .rv-discrete-color-legend-item.vertical .rv-discrete-color-legend-item__title {
            display:inline;
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
    )
  }
}

Index.getInitialProps = async function({ params }) {
  //req to GET specific county data
  const res = await fetch(`${backendURL}/counties/0`);
  const data = await res.json();

  //req to GET all counties
  const countyRes = await fetch(`${backendURL}/counties`);
  const countyList = await countyRes.json();

  return {
      selectedCountyData: data,
      countyList: countyList
  };
}

export default Index;