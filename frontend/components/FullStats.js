import styles from '../styles/global.module.css'
import { formatCellData } from '../utils/utilities'

const FullStats = (props) => {
    const selectedCountyData = props.selectedCountyData;

    const availableYears = Object.keys(selectedCountyData).reverse();
    const itemKeys = Object.keys(selectedCountyData[availableYears[0]]);
    const tableData = itemKeys.map(key => {
        const values = availableYears.map(item => selectedCountyData[item][key] );
        return { [key] : [...values] }
    });
    
    return (
        <div className={styles.statstable}>
            <h3>Full Stats</h3>
                <table className={styles['full-stats-table']}>
                    <thead>
                        <tr>
                            <td></td>
                            { availableYears.map((year, i) => {
                                return (
                                    <td key={i} className={styles['full-stats-heading']}>{ year }</td>
                                )
                            })}
                        </tr>
                    </thead>
                    { selectedCountyData 
                    ? ( <tbody className={styles['full-stats-table-body']}>
                           { tableData.map((item, i) => {
                               const cellData = Object.entries(item)[0];
                               return (
                                    <tr key={i} >
                                        <td className={styles['full-stats-row-heading']}>{ cellData[0] }</td>
                                        { cellData[1].map((value, i) => {
                                            const val = value ? value : 0;
                                            return (
                                                <td key={i} className={styles['full-stats-data']}>{ formatCellData(val, cellData[0]) }</td>
                                            )
                                        })}
                                    </tr>  
                               )
                           })}
                        </tbody> ) 
                    : ( <tbody>
                            <tr>
                                <td>No Data available</td>
                                <td></td>
                            </tr>
                        </tbody> )
                    }
            </table>
        </div>
    )
}

export default FullStats;