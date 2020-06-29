
export default async (req, res) => {
  // ! TODO: Connect to backend  
  const backendURL = process.env.API_ENDPOINT;
  const countyRes = await fetch(`${backendURL}/counties`);
  const data = await countyRes.json();
  res.status(200).json({ data: data })
}


