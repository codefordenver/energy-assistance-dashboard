import { 
    XYPlot, 
    VerticalBarSeries, 
    XAxis, 
    YAxis, 
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    Hint
} from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import styles from '../styles/global.module.css'

function generateTickValues(key, maxY){
    let dynamicTickValues = []
    let i = 0;
    let tickIteration = (key == 'Households below 200% FPL') ? 25000 : 0.1;
    do {
        dynamicTickValues.push(Math.round(i * tickIteration * 10) / 10);
        i++;
    } while ((i * tickIteration) < maxY + tickIteration)
    return dynamicTickValues;
}

class ParetoChart extends React.Component {
    state = {
        hoveredNode: null,
        type: null
    };

    render(){
        const barKey = this.props.barKey
        const lineKey = this.props.lineKey
        const LEGEND = [
            {title: barKey, color: "#46bdc6"},
            {title: lineKey, color: '#ff6d01'},
        ]
        const rawData = this.props.data.selectedCountyData;
    
        const countyData = Object.keys(rawData).map(key => {
            return { x: key, y: rawData[key][barKey] }
        })
    
        const householdsAssisted = Object.keys(rawData).map(key => {
            return { x: key, y: rawData[key][lineKey] }
        })
    
        const maxYValue = Math.max(...countyData.map(set =>  set.y));
        const minXValue = Math.min(...Object.keys(rawData));
        const maxXValue = Math.max(...Object.keys(rawData));
        const tickValues = generateTickValues(barKey, maxYValue);
        const maxYTickValue = Math.max(...tickValues);
    
        const tickFormat = (barKey == '% Households below 200% FPL') 
                            ? (d) => Math.ceil(d * 100) + '.0%' 
                            : null;
    
        return (
            <div className={styles['pareto-chart']}>
                
                <DiscreteColorLegend 
                    orientation="horizontal" 
                    width={500} 
                    items={LEGEND} 
                />
                <XYPlot 
                    height={300} 
                    width={500} 
                    xDomain={[minXValue, maxXValue]}
                    yDomain={[0, maxYTickValue]} 
                    color="#46bdc6"
                    onMouseLeave={() => this.setState({hoveredNode: null, type: null})}
                >
                  { this.state.hoveredNode && (
                    <Hint
                        xType="literal"
                        yType="literal"
                        getX={d => d.x}
                        getY={d => d.y}
                        value={{
                            Year: this.state.hoveredNode.x,
                            Value: (this.state.type == 'bar') 
                                ? `${this.state.hoveredNode.y} ${barKey}` 
                                : `${this.state.hoveredNode.y} ${lineKey}`
                        }}
                    />
                    )}
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
                        onValueMouseOver={d => this.setState({hoveredNode: d, type: 'bar'})}
                    />
                     <LineMarkSeries 
                        strokeWidth={2}
                        data={householdsAssisted}
                        stroke='#ff6d01'
                        style={{ fill: 'none' }}
                        markStyle={{ fill: '#ff6d01', stroke: 'rgba(0, 0, 0, 0)' }}
                        onValueMouseOver={d => this.setState({hoveredNode: d, type: 'line'})}
                    />
                </XYPlot>
            </div>  
        );
    }
  
}

export default ParetoChart;

