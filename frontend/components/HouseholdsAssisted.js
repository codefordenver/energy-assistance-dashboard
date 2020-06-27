import { 
    FlexibleXYPlot, 
    XAxis, 
    YAxis, 
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries,
    Hint
} from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import styles from '../styles/global.module.css';
import { minMax, generateRegressionData, formatData, formatTickPercent } from '../utils/utilities';

class HouseholdsAssisted extends React.Component {
    state = {
        hoveredNode: null,
    };

    render(){
        const { title, selectedCountyData } = this.props;
        const hoveredNode = this.state.hoveredNode;
        const LEGEND = [
            { 
                title: title, 
                color: "#46bdc6"
            }
        ];

        const householdsAssisted = formatData(selectedCountyData, title);
        const { minXValue, maxXValue, maxYValue } = minMax(selectedCountyData, householdsAssisted);
        const regressionData = generateRegressionData(selectedCountyData, title);

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
                        onMouseLeave={() => this.setState({hoveredNode: null})}
                    >
                    { hoveredNode && (
                            <Hint
                                className={styles.hint}
                                getX={d => d.x}
                                getY={d => d.y}
                                value={{
                                    Year: hoveredNode.x,
                                    Value: `${Math.ceil(hoveredNode.y * 100)}%`
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
                            tickFormat={(d) => formatTickPercent(d)}
                        />
                        <LineMarkSeries 
                            strokeWidth={2}
                            data={householdsAssisted}
                            lineStyle={{ fill: 'none' , stroke: '#46bdc6' }}
                            markStyle={{ fill: '#46bdc6', stroke: 'rgba(0, 0, 0, 0)' }}
                            onValueMouseOver={d => this.setState({hoveredNode: d})}
                            curve={'curveMonotoneX'}
                        />
                        <LineSeries 
                            strokeWidth={2}
                            data={regressionData}
                            style={{  stroke: '#46bdc670' }}
                        />
                    </FlexibleXYPlot>
                </div>
            </div>
        )
    }
}


export default HouseholdsAssisted;