const SummaryTable = (props) => {
    const yearData = props.data.data['2018'];
    const percentAssisted = `${(yearData["% of Households below 200% FPL Assisted"] * 100).toFixed(2)}%`;
    const selectedYear = '2018';

    return (
        <div className="summary-table">
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
                    <td className="data">{ withComma(yearData["Households below 200% FPL"])}</td>
                </tr>
                <tr>
                    <td>Total Households Assisted</td>
                    <td className="data">{ withComma(yearData["Total Households Assisted"])} </td>
                </tr>
                <tr>
                    <td>% of LI Households Assisted</td>
                    <td className="data">{percentAssisted}</td>
                </tr>
            </tbody>
            </table>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');        
                .summary-table {
                    font-family: 'Nunito', sans-serif;
                    padding: 20px;
                }
                h3 {
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 18px;
                    margin: 18px 0 6px;
                }
                table {
                    border: 1px solid rgb(197, 197, 197);
                    font-size: 13px;
                    border-collapse: collapse;
                    font-weight: 400;
                }
                thead tr {
                    height: 20px;
                    background: rgb(197, 197, 197);
                }
                tbody tr {
                    border-bottom: 1px solid rgb(197, 197, 197);
                }
                tbody tr td {
                    padding: 2px 5px;
                }
                .data {
                    font-weight: 700;
                    font-size: 17px;
                    text-align: right;
                    width: 120px; 
                }
            `}</style>
        </div>
    )
}


function withComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default SummaryTable;