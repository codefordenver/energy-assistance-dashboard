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


function generateTickValues(key, maxY){
    let dynamicTickValues = []
    for (var i = 0; i < 10; i++) {
        if(key == 'Households below 200% FPL') {
            const value = i * 25000 < maxY;
            if(value){
                dynamicTickValues.push(i * 25000);
            }
        } else {
            const value = (i / 10) < maxY;
            if(value){
                dynamicTickValues.push(i / 10);
            }
        }
    }
    return dynamicTickValues;
}

const ParetoChart1 = (props) => {
    const barKey = props.barKey
    const lineKey = props.lineKey
    const LEGEND = [
        {title: barKey, color: "#46bdc6"},
        {title: lineKey, color: '#ff6d01'},
    ]
    const rawData = props.data.selectedCountyData;
    // const rawData = {"2011":{"Population":590507,"Households":258132,"Average Household Size":2.24,"Median Household Income":47499,"Households below 200% FPL":99932,"% Households below 200% FPL":0.39,"EA Participants":"2957","LEAP Participants":"12937","Total Households Assisted":15894,"% of Households below 200% FPL Assisted":0.16},"2012":{"Population":604356,"Households":261836,"Average Household Size":2.26,"Median Household Income":49091,"Households below 200% FPL":101707,"% Households below 200% FPL":0.39,"EA Participants":"4530","LEAP Participants":"12509","Total Households Assisted":null,"% of Households below 200% FPL Assisted":0.17},"2013":{"Population":619297,"Households":266069,"Average Household Size":2.27,"Median Household Income":50313,"Households below 200% FPL":103765,"% Households below 200% FPL":0.39,"EA Participants":"3232","LEAP Participants":"11264","Total Households Assisted":14496,"% of Households below 200% FPL Assisted":0.14},"2014":{"Population":633777,"Households":271054,"Average Household Size":2.28,"Median Household Income":51800,"Households below 200% FPL":104129,"% Households below 200% FPL":0.38,"EA Participants":"3479","LEAP Participants":"10019","Total Households Assisted":13498,"% of Households below 200% FPL Assisted":0.13},"2015":{"Population":649654,"Households":275795,"Average Household Size":2.3,"Median Household Income":53637,"Households below 200% FPL":101261,"% Households below 200% FPL":0.37,"EA Participants":"3779","LEAP Participants":"8874","Total Households Assisted":12653,"% of Households below 200% FPL Assisted":0.12},"2016":{"Population":663303,"Households":281072,"Average Household Size":2.31,"Median Household Income":56258,"Households below 200% FPL":98956,"% Households below 200% FPL":0.35,"EA Participants":"3168","LEAP Participants":"8313","Total Households Assisted":11481,"% of Households below 200% FPL Assisted":0.12},"2017":{"Population":678467,"Households":287262,"Average Household Size":2.31,"Median Household Income":60098,"Households below 200% FPL":95839,"% Households below 200% FPL":0.33,"EA Participants":"3236","LEAP Participants":"7432","Total Households Assisted":10668,"% of Households below 200% FPL Assisted":0.11},"2018":{"Population":693417,"Households":294358,"Average Household Size":2.31,"Median Household Income":63793,"Households below 200% FPL":92530,"% Households below 200% FPL":0.31,"EA Participants":"3181","LEAP Participants":"7160","Total Households Assisted":10341,"% of Households below 200% FPL Assisted":0.11}, "2019":{"Population":693417,"Households":294358,"Average Household Size":2.31,"Median Household Income":63793,"Households below 200% FPL":92530,"% Households below 200% FPL":0.31,"EA Participants":"3181","LEAP Participants":"7160","Total Households Assisted":10341,"% of Households below 200% FPL Assisted":0.11}}

    const countyData = Object.keys(rawData).map(key => {
        return { x: key, y: rawData[key][barKey] }
    })

    const householdsAssisted = Object.keys(rawData).map(key => {
        return { x: key, y: rawData[key][lineKey] }
    })

    const maxYValue = Math.max(...countyData.map(set =>  set.y)) * 1.2;
    const minXValue = Math.min(...Object.keys(rawData));
    const maxXValue = Math.max(...Object.keys(rawData));
    const tickValues = generateTickValues(barKey, maxYValue);

    const tickFormat = (barKey == '% Households below 200% FPL') 
                        ? (d) => Math.ceil(d * 100) + '.0%' 
                        : null;

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
                xDomain={[minXValue, maxXValue]}
                yDomain={[0, maxYValue]} 
                color="#46bdc6"
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickFormat={v => v.toString().replace(',', '')} />
                <YAxis 
                    tickValues={tickValues} 
                    style={{ text: {transform: 'translate(0, 0)'}}} 
                    tickFormat={tickFormat}
                />
                <VerticalBarSeries 
                    data={countyData}
                    stroke='rgba(0, 0, 0, 0)'
                />
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

