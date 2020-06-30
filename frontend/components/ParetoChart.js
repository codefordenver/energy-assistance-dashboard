import { 
    FlexibleXYPlot,
    VerticalBarSeries, 
    XAxis, 
    YAxis, 
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    Hint
} from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import styles from '../styles/global.module.css';
import { formatPercent, minMax, formatTickPercent } from '../utils/utilities';


class ParetoChart extends React.Component {
    state = {
        hoveredNode: null,
        type: null
    };
    
    render(){
        const { barKey, lineKey, selectedCountyData } = this.props;
        const hoveredNode = this.state.hoveredNode;
        const LEGEND = [
            { 
                title: barKey, 
                color: "#46bdc6"
            },
            { 
                title: lineKey, 
                color: '#ff6d01'
            },
        ];
    
        const householdsInNeed = Object.keys(selectedCountyData).map(key => {
            return { x: key, y: selectedCountyData[key][barKey] }
        });
    
        const householdsAssisted = Object.keys(selectedCountyData).map(key => {
            return { x: key, y: selectedCountyData[key][lineKey] }
        });   
        const { minXValue, maxXValue, maxYValue } = minMax(selectedCountyData, householdsInNeed, householdsAssisted);
        const tickFormat = (barKey == '% Households below 200% FPL') 
                            ? (d) => formatTickPercent(d)
                            : null;

        return (
            <div className={styles['chart-container']}>
                <DiscreteColorLegend 
                    orientation="vertical" 
                    items={LEGEND} 
                    />
                <div className={styles['chart']}>
                    <FlexibleXYPlot 
                        xDomain={[minXValue, maxXValue]}
                        yDomain={[0, maxYValue]} 
                        color="#46bdc6"
                        onMouseLeave={() => this.setState({hoveredNode: null, type: null})}
                        >
                    {hoveredNode && (
                        <Hint
                        className={styles.hint}
                        getX={d => d.x}
                        getY={d => d.y}
                        value={{
                            Year: hoveredNode.x,
                            Value: (this.state.type == 'bar') 
                            ? `${formatPercent(barKey, hoveredNode.y)}${barKey}` 
                            : `${formatPercent(barKey, hoveredNode.y)}${lineKey}`
                        }}
                        />
                        )}
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis 
                            tickFormat={d => d.toString().replace(',', '')} 
                            />
                        <YAxis 
                            style={{ text: {transform: 'translate(0, 0)'}}} 
                            tickFormat={tickFormat}
                            />
                        <VerticalBarSeries 
                            data={householdsInNeed}
                            stroke='rgba(0, 0, 0, 0)'
                            onValueMouseOver={d => this.setState({hoveredNode: d, type: 'bar'})}
                            />
                        <LineMarkSeries 
                            strokeWidth={2}
                            data={householdsAssisted}
                            lineStyle={{ fill: 'none' , stroke: '#ff6d01' }}
                            markStyle={{ fill: '#ff6d01', stroke: 'rgba(0, 0, 0, 0)' }}
                            onValueMouseOver={d => this.setState({hoveredNode: d, type: 'line'})}
                            curve={'curveMonotoneX'}
                            />
                    </FlexibleXYPlot>
                </div>
            </div>
        );
    }
}

export default ParetoChart;

