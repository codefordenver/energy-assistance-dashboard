const { BACKEND_URL } = require("./utils/constants");
const fetch = require("node-fetch")

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

    counties.map((county) => {
      pathMap[`/counties/${county}`] = {
        page: "/counties/[name]",
        query: { name: county },
      };
    });

    return pathMap;
  },
};
