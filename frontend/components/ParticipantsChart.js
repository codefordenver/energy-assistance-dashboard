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
import { 
    minMax, 
    withComma, 
    generateRegressionData, 
    formatData 
} from '../utils/utilities';

class ParticipantsChart extends React.Component {
    state = {
        hoveredNode: null,
    };

    render(){
        const { selectedCountyData } = this.props;
        const hoveredNode = this.state.hoveredNode;
        const title1 = 'LEAP Participants';
        const title2 = 'EA Participants';
        const LEGEND = [
            { 
                title: title1, 
                color: '#46bdc6'
            },
            { 
                title: title2, 
                color: '#ff6d01'
            }
        ];
        
        const LEAPParticipants = formatData(selectedCountyData, title1);
        const EAParticipants = formatData(selectedCountyData, title2);
        const { minXValue, maxXValue, maxYValue } = minMax(selectedCountyData, LEAPParticipants, EAParticipants);
        const LEAPRegressionData = generateRegressionData(selectedCountyData, title1);
        const EARegressionData = generateRegressionData(selectedCountyData, title2);

        return (
            <div className={styles['chart-container']}>
                <DiscreteColorLegend 
                    orientation="horizontal"
                    items={LEGEND} 
                    />
                <div className={styles['chart']}>
                    <FlexibleXYPlot 
                        xDomain={[minXValue, maxXValue]}
                        yDomain={[0, (maxYValue * 1.2)]} 
                        onMouseLeave={() => this.setState({hoveredNode: null})}
                    >
                    { hoveredNode && (
                            <Hint
                                className={styles.hint}
                                getX={d => d.x}
                                getY={d => d.y}
                                value={{
                                    Year: hoveredNode.x,
                                    Value: withComma(hoveredNode.y)
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
                        />
                        <LineMarkSeries 
                            strokeWidth={2}
                            data={LEAPParticipants}
                            lineStyle={{ fill: 'none' , stroke: '#46bdc6' }}
                            markStyle={{ fill: '#46bdc6', stroke: 'rgba(0, 0, 0, 0)' }}
                            onValueMouseOver={d => this.setState({hoveredNode: d})}
                            curve={'curveMonotoneX'}
                        />
                        <LineSeries 
                            strokeWidth={2}
                            data={LEAPRegressionData}
                            style={{  stroke: '#46bdc670' }}
                        />
                        <LineMarkSeries 
                            strokeWidth={2}
                            data={EAParticipants}
                            lineStyle={{ fill: 'none' , stroke: '#ff6d01' }}
                            markStyle={{ fill: '#ff6d01', stroke: 'rgba(0, 0, 0, 0)' }}
                            onValueMouseOver={d => this.setState({hoveredNode: d})}
                            curve={'curveMonotoneX'}
                        />
                        <LineSeries 
                            strokeWidth={2}
                            data={EARegressionData}
                            style={{  stroke: '#ff6f017c' }}
                        />
                    </FlexibleXYPlot>
                </div>
            </div>
        )
    }
}


export default ParticipantsChart;