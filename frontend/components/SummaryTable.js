import styles from '../styles/global.module.css'

const SummaryTable = (props) => {
    const selectedYear = '2018';
    const yearData = props.data[selectedYear];
    const percentAssisted = `${(yearData["% of Households below 200% FPL Assisted"] * 100).toFixed(2)}%`;
    
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
                <tbody>
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
                        <td className={styles.bold}>{percentAssisted}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


function withComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default SummaryTable;