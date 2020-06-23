import styles from '../styles/global.module.css'

export default function CountyDropdown(props){
    const countyList = Object.entries(props.data.countyList.counties);
    
    return (
        <div className={styles['dropdown-container']}>
            <label htmlFor="county-dropdown">Select a County: </label>
            <select className={styles.dropdown} name="county-dropdown" onChange={(e) => props.getCountyId(e)}>
                {countyList.map((county) => {
                    return (
                        <option key={county[0]} value={county[0]}>{county[1]}</option>
                    )
                })}
            </select>
        </div>
    )
}