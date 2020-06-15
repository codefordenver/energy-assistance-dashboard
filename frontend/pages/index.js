import Head from 'next/head'
import SummaryTable from '../components/SummaryTable';
import CountyDropdown from '../components/CountyDropdown';
import ParetoChart1 from '../components/ParetoChart1';
import styles from '../styles/global.module.css'

const frontendUrl = 'http://localhost:3000'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedCountyData: this.props
    };
  }

  getCountyId = (e) => {
    e.preventDefault();
    const id = e.target.value;
    fetch(`${frontendUrl}/api/counties/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          countyData: data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Energy Assistance Dashboard</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <main>
          <div className={styles['top-container']}>
            <div>
              <CountyDropdown data={this.props} getCountyId={this.getCountyId}/>

              <SummaryTable data={this.state.selectedCountyData} />
            </div>

            <img src="/energy-outreach-logo.png" alt="Energy Outreach Colorado Logo" className={styles['eoc-logo']} />
          </div>

          <div>Place full stats table here!</div>

          <h3>Historical Trends</h3>
          <div className={styles['historical-trends-charts']}>
            <ParetoChart1 barKey='Households below 200% FPL' lineKey='Total Households Assisted' data={this.state.selectedCountyData}/>
            <ParetoChart1 barKey='% Households below 200% FPL' lineKey='% of Households below 200% FPL Assisted' data={this.state.selectedCountyData}/>
          </div>

          <div className={styles.sources}>
            <h4>Sources</h4>
            <p>American Community Survey 5-Year Estimates by the Census Bureau, Energy Outreach Colorado's households served, and CDHS LEAP households served</p>
            <p>2013 LEAP data is estimated due to lack of data</p>
          </div>



          <div className="documentation">
            <h3>------ Delete everything below here once documentation is no longer needed ------</h3>

            <h1 className="title">
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <p className="description">
              Get started by editing <code>pages/index.js</code>
            </p>

            <div className="grid">
              <a href="https://nextjs.org/docs" className="card">
                <h3>Documentation &rarr;</h3>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className="card">
                <h3>Learn &rarr;</h3>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/master/examples"
                className="card"
              >
                <h3>Examples &rarr;</h3>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className="card"
              >
                <h3>Deploy &rarr;</h3>
                <p>
                  Instantly deploy your Next.js site to a public URL with Vercel.
                </p>
              </a>
            </div>
          </div>
        </main>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
          }

          .documentation {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .logo {
            height: 1em;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
          
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
          .react-vis-magic-css-import-rule{display:inherit}.rv-treemap{font-size:12px;position:relative}.rv-treemap__leaf{overflow:hidden;position:absolute}.rv-treemap__leaf--circle{align-items:center;border-radius:100%;display:flex;justify-content:center}.rv-treemap__leaf__content{overflow:hidden;padding:10px;text-overflow:ellipsis}.rv-xy-plot{color:#c3c3c3;position:relative}.rv-xy-plot canvas{pointer-events:none}.rv-xy-plot .rv-xy-canvas{pointer-events:none;position:absolute}.rv-xy-plot__inner{display:block}.rv-xy-plot__axis__line{fill:none;stroke-width:2px;stroke:#e6e6e9}.rv-xy-plot__axis__tick__line{stroke:#e6e6e9}.rv-xy-plot__axis__tick__text{fill:#6b6b76;font-size:11px}.rv-xy-plot__axis__title text{fill:#6b6b76;font-size:11px}.rv-xy-plot__grid-lines__line{stroke:#e6e6e9}.rv-xy-plot__circular-grid-lines__line{fill-opacity:0;stroke:#e6e6e9}.rv-xy-plot__series,.rv-xy-plot__series path{pointer-events:all}.rv-xy-plot__series--line{fill:none;stroke:#000;stroke-width:2px}.rv-crosshair{position:absolute;font-size:11px;pointer-events:none}.rv-crosshair__line{background:#47d3d9;width:1px}.rv-crosshair__inner{position:absolute;text-align:left;top:0}.rv-crosshair__inner__content{border-radius:4px;background:#3a3a48;color:#fff;font-size:12px;padding:7px 10px;box-shadow:0 2px 4px rgba(0,0,0,0.5)}.rv-crosshair__inner--left{right:4px}.rv-crosshair__inner--right{left:4px}.rv-crosshair__title{font-weight:bold;white-space:nowrap}.rv-crosshair__item{white-space:nowrap}.rv-hint{position:absolute;pointer-events:none}.rv-hint__content{border-radius:4px;padding:7px 10px;font-size:12px;background:#3a3a48;box-shadow:0 2px 4px rgba(0,0,0,0.5);color:#fff;text-align:left;white-space:nowrap}.rv-discrete-color-legend{box-sizing:border-box;overflow-y:auto;font-size:12px}.rv-discrete-color-legend.horizontal{white-space:nowrap}.rv-discrete-color-legend-item{color:#3a3a48;border-radius:1px;padding:9px 10px}.rv-discrete-color-legend-item.horizontal{display:inline-block}.rv-discrete-color-legend-item.horizontal .rv-discrete-color-legend-item__title{margin-left:0;display:block}.rv-discrete-color-legend-item__color{display:inline-block;vertical-align:middle;overflow:visible}.rv-discrete-color-legend-item__color__path{stroke:#dcdcdc;stroke-width:2px}.rv-discrete-color-legend-item__title{margin-left:10px}.rv-discrete-color-legend-item.disabled{color:#b8b8b8}.rv-discrete-color-legend-item.clickable{cursor:pointer}.rv-discrete-color-legend-item.clickable:hover{background:#f9f9f9}.rv-search-wrapper{display:flex;flex-direction:column}.rv-search-wrapper__form{flex:0}.rv-search-wrapper__form__input{width:100%;color:#a6a6a5;border:1px solid #e5e5e4;padding:7px 10px;font-size:12px;box-sizing:border-box;border-radius:2px;margin:0 0 9px;outline:0}.rv-search-wrapper__contents{flex:1;overflow:auto}.rv-continuous-color-legend{font-size:12px}.rv-continuous-color-legend .rv-gradient{height:4px;border-radius:2px;margin-bottom:5px}.rv-continuous-size-legend{font-size:12px}.rv-continuous-size-legend .rv-bubbles{text-align:justify;overflow:hidden;margin-bottom:5px;width:100%}.rv-continuous-size-legend .rv-bubble{background:#d8d9dc;display:inline-block;vertical-align:bottom}.rv-continuous-size-legend .rv-spacer{display:inline-block;font-size:0;line-height:0;width:100%}.rv-legend-titles{height:16px;position:relative}.rv-legend-titles__left,.rv-legend-titles__right,.rv-legend-titles__center{position:absolute;white-space:nowrap;overflow:hidden}.rv-legend-titles__center{display:block;text-align:center;width:100%}.rv-legend-titles__right{right:0}.rv-radial-chart .rv-xy-plot__series--label{pointer-events:none}
          .rv-discrete-color-legend-item.horizontal .rv-discrete-color-legend-item__title {
            display:inline;
            padding-left: 10px;
          }
        `}</style>
      </div>
    )
  }
}

Index.getInitialProps = async function() {
  //req to GET specific county data
  const res = await fetch(`${frontendUrl}/api/counties/[id].js`);
  const data = await res.json();

  //req to GET all counties
  const countyRes = await fetch(`${frontendUrl}/api/counties`);
  const countyList = await countyRes.json();

  return {
      selectedCountyData: data.data,
      countyList: countyList
  };
}

export default Index;