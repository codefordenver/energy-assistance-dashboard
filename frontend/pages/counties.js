import { useState } from "react";
import { useRouter } from "next/router";
import CountyDropdown from "../components/CountyDropdown";
import styles from "../styles/global.module.css";
import { BACKEND_URL } from "../utils/constants";

export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

// TODO: Refactor counties function so that the counties/[id].js files is used to determine the count instead of the query.

function Counties(props) {
  const { countyList } = props;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles['stats-container']}>
      <div className={styles["overview"]}>
      <div className={styles['title-container']}>
          <div className={styles["print-report"]}>
            <span className={styles["print-label"]}>Report for:</span>
            <CountyDropdown
              countyList={countyList}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #e6e6e6;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

Counties.getInitialProps = async ({ query }) => {
  //req to GET all counties
  const countyListRes = await fetch(`${BACKEND_URL}/counties`);
  const countyList = await countyListRes.json();

  return {
    countyList: countyList,
    query: query,
  };
};

export default Counties;
