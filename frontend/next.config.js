const { BACKEND_URL } = require("./utils/constants");

module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    let pathMap = {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/counties": { page: "/counties" },
    };

    //req to GET all counties
    const countyRes = await fetch(`${BACKEND_URL}/counties`);
    const countyList = await countyRes.json();
    const counties = Object.values(countyList.counties);

    // console.log(counties);
    counties.map((county) => {
      console.log(county)
      pathMap[`/counties/${county}`] = {
        page: "/counties",
        query: { name: county },
      };
    });

    console.log(pathMap);

    return pathMap;
  },
};
