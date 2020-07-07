import { getKeyByValue } from "../pages";
import styles from "../styles/global.module.css";

export default function CountyDropdown(props) {
  const { selectedCountyName, countyList, getCountyId } = props;
  const countyArray = Object.entries(countyList.counties);
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor='county-dropdown' className={styles["no-print"]}>
        Select a County:
      </label>
      <select
        className={styles.dropdown}
        name='county-dropdown'
        value={getKeyByValue(selectedCountyName)}
        onChange={(e) => getCountyId(e)}
      >
        {countyArray.map((county) => {
          return (
            <option key={county[0]} value={county[0]}>
              {county[1]}
            </option>
          );
        })}
      </select>
    </div>
  );
}
