import { 
    XYPlot, 
    VerticalBarSeries, 
    XAxis, 
    YAxis, 
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries 
} from 'react-vis';

const ParetoChart1 = (props) => {
    console.log(props.data.selectedCountyData)
    const rawData = props.data.selectedCountyData;
    const countyData = [];
    const householdsAssisted = [];
    Object.keys(rawData).map(year => {
        countyData.push({x: year})
        householdsAssisted.push({x: year})
    })

    Object.entries(rawData).map((value, i) => {
        countyData[i].y = value[1]['Households below 200% FPL'];
        householdsAssisted[i].y = value[1]['Total Households Assisted'];
    })

    console.log(householdsAssisted)

    return (
        <div>
            <XYPlot height={300} width={600} xDomain={[2020, 2008]} color="#46bdc6" stackBy="y">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries 
                    data={countyData} 
                    style={{width: '30px' }}
                />
                 <LineMarkSeries 
                    data={householdsAssisted}
                    style={{ fill: '#ff6d01'}}    
                />
            </XYPlot>
        </div>
    );
}

export default ParetoChart1;

