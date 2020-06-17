import styles from '../styles/global.module.css'
import { withComma } from '../utils/utilities'

const SummaryTable = (props) => {
    const selectedYear = '2018';
    const yearData = props.selectedCountyData[selectedYear];
    return (
        <div className={styles.summarytable}>
            <h3>{selectedYear} Overview</h3>
                <table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                { yearData 
                    ? ( <tbody>
                            <tr>
                                <td>Low Income Households</td>
                                <td className={styles.bold}>{ withComma(yearData["Households below 200% FPL"])}</td>
                            </tr>
                            <tr>
                                <td>Total Households Assisted</td>
                                <td className={styles.bold}>{ withComma(yearData["Total Households Assisted"])} </td>
                            </tr>
                            <tr>
                                <td>% of LI Households Assisted</td>
                                <td className={styles.bold}>{`${(yearData["% of Households below 200% FPL Assisted"] * 100).toFixed(2)}%`}</td>
                            </tr>
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

export default SummaryTable;