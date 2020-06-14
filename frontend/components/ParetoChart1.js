import { 
    XYPlot, 
    VerticalBarSeries, 
    XAxis, 
    YAxis, 
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries 
} from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';

const ParetoChart1 = (props) => {
    const barKey = props.barKey
    const lineKey = props.lineKey

    const rawData = props.data.selectedCountyData;
    const countyData = [];
    const householdsAssisted = [];

    const LEGEND = [
        {title: barKey, color: "#46bdc6"},
        {title: lineKey, color: '#ff6d01'},
    ]

    Object.keys(rawData).map(year => {
        countyData.push({x: year})
        householdsAssisted.push({x: year})
    })

    Object.entries(rawData).map((value, i) => {
        countyData[i].y = value[1][barKey];
        householdsAssisted[i].y = value[1][lineKey];
    })

    let yDomain = (barKey == 'Households below 200% FPL') ? [0, 125000] : [0, .4];
    let tickValues = (barKey == 'Households below 200% FPL') ? [0, 25000, 50000, 75000, 100000, 125000] : [0, .1, .2, .3, .4];
    let tickFormat = (barKey == '% Households below 200% FPL') ? (d) => (d * 100) + '.00%' : null;

    return (
        <div>
            <DiscreteColorLegend 
                orientation="horizontal" 
                width={410} 
                items={LEGEND} 
            />
            <XYPlot 
                height={300} 
                width={400} 
                xDomain={[2010, 2018]} 
                yDomain={yDomain} 
                color="#46bdc6"
                className="svg-chart"
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickFormat={v => v.toString().replace(',', '')} />
                <YAxis 
                    tickValues={tickValues} 
                    style={{ text: {transform: 'translate(0, 0)'}}} 
                    tickFormat={tickFormat}
                />
                <VerticalBarSeries data={countyData}/>
                 <LineMarkSeries 
                    strokeWidth={2}
                    data={householdsAssisted}
                    stroke='#ff6d01'
                    style={{ fill: 'none' }}
                    markStyle={{ fill: '#ff6d01' }} 
                />
            </XYPlot>
        </div>  
    );
}

export default ParetoChart1;

