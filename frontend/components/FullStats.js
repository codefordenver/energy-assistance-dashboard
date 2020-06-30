import styles from '../styles/global.module.css'
import { formatNumber } from '../utils/utilities'

const FullStats = (props) => {
    const availableYears = Object.keys(props.selectedCountyData).reverse();
    const countyData = availableYears.map(key => {
        return { [key]: props.selectedCountyData[key] };
    });

    const itemKeys = Object.keys(countyData[0]['2019']);

    const tableData = itemKeys.map(key => {
        const values = availableYears.map(item => props.selectedCountyData[item][key] );
        return { [key] : [...values] }
    });
    
    return (
        <div className={styles.summarytable}>
            <h3>Full Stats</h3>
                <table class={styles['full-stats-table']}>
                    <thead>
                        <tr>
                            <td></td>
                            { availableYears.map(year => {
                                return (
                                    <td className={styles['full-stats-heading']}>{ year }</td>
                                )
                            })}
                        </tr>
                    </thead>
                    { props.selectedCountyData 
                    ? ( <tbody>
                           { tableData.map(item => {
                               const topValue = Object.keys(item)[0]
                               const tableValues = Object.values(item)[0]
                               return (
                                <tr>
                                    <td className={styles['full-stats-row-heading']}>{ topValue }</td>
                                    { tableValues.map(value => {
                                        return (
                                        <td className={styles['full-stats-data']}>{ formatNumber(value ? value : 0) }</td>
                                        )
                                    })}
                                </tr>  
                               )
                           })}
                        </tbody> ) 
                    : ( <tbody>
                            <tr>
                                <td>No Data for {selectedYear}</td>
                                <td></td>
                            </tr>
                        </tbody> )
                    }
            </table>
        </div>
    )
}

export default FullStats;