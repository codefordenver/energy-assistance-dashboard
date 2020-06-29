export default async (req, res) => {
  // ! TODO: Connect to backend  
  const { query: { id } } = req
  const backendURL = process.env.API_ENDPOINT;
  const countyDataRes = await fetch(`${backendURL}/counties/${id}`);
  const data = await countyDataRes.json();
  res.status(200).json({ data: data })
}


