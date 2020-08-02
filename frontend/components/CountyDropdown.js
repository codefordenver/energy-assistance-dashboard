import { useRouter } from "next/router";

import { getKeyByValue } from "../pages/counties";
import styles from "../styles/global.module.css";

export default function CountyDropdown(props) {
  const router = useRouter();
  const {name} = router.query;
  const { countyList, setLoading } = props;
  const countyArray = Object.entries(countyList.counties);
  
  console.log(router.query);
  const getCountyData = async (id) => {
    router.push({
      pathname: `/counties/${countyList.counties[id] }`,
    });
    setLoading(true);
  };

  const getCountyId = (e) => {
    e.preventDefault();
    const id = e.target.value;
    getCountyData(id);
  };
  
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor='county-dropdown' className={styles["no-print"]}>
        Select a County:
      </label>

      <select
        className={styles.dropdown}
        name='county-dropdown'
        value={name ? getKeyByValue(countyList.counties, name) : 0}
        onChange={(e) => getCountyId(e)}
      >
        {name ? "" : <option value={0} disabled>Select a county to get started</option>}
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
