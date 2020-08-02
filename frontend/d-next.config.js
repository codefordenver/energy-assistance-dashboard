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

    console.log(countyList);

    return pathMap;
  },
};
