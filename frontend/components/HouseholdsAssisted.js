import { 
    XYPlot, 
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
import { generateTickValues, generateRegressionData, formatData  } from '../utils/utilities';

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

        const maxYValue = Math.max(...householdsAssisted.map(data =>  data.y));
        const minXValue = Math.min(...Object.keys(selectedCountyData));
        const maxXValue = Math.max(...Object.keys(selectedCountyData));
        const yTickValues = generateTickValues(0.05, maxYValue);
        const maxYTickValue = Math.max(...yTickValues);
        const tickFormat = (d) => `${Math.ceil(d * 100)}%`;

        const regressionData = generateRegressionData(selectedCountyData, title);

        return (
            <div className={styles['chart']}>
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
                        tickValues={yTickValues} 
                        style={{ text: {transform: 'translate(0, 0)'}}} 
                        tickFormat={tickFormat}
                    />
                    <LineMarkSeries 
                        strokeWidth={2}
                        data={householdsAssisted}
                        lineStyle={{ fill: 'none' , stroke: '#46bdc6' }}
                        markStyle={{ fill: '#46bdc6', stroke: 'rgba(0, 0, 0, 0)' }}
                        onValueMouseOver={d => this.setState({hoveredNode: d})}
                    />
                    <LineSeries 
                        strokeWidth={2}
                        data={regressionData}
                        style={{  stroke: '#46bdc670' }}
                    />
                </XYPlot>
            </div>
        )
    }
}


export default HouseholdsAssisted;