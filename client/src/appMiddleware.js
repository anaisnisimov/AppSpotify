import Axios from "axios";

export const getToken = async () => {
  const res = await Axios.get(`http://localhost:5000/`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return res.data.body;
}
  
// export const getApiData = async token => {
//   const res = Axios.get(`https://api.spotify.com/v1/search?q=wonderwall&type=track`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   return res;
// }