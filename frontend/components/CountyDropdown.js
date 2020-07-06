import styles from "../styles/global.module.css";

export default function CountyDropdown(props) {
  const { selectedCountyId } = props;
  const countyArray = Object.entries(props.countyList.counties);
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor='county-dropdown' className={styles["no-print"]}>
        Select a County:
      </label>
      <select
        className={styles.dropdown}
        name='county-dropdown'
        value={selectedCountyId}
        onChange={(e) => props.getCountyId(e)}
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
