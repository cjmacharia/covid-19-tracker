import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changableUrl = url
  if(country) {
    changableUrl = `${url}/countries/${country}`
  }
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(changableUrl)
    return { confirmed,  recovered, deaths, lastUpdate}
  }
  catch(err) {

  }
}

export const fethcDailyData = async () => {
  
  try {
    const { data } = await axios.get(`${url}/daily`)
    const receivecData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }))
return receivecData;
  } catch (err) {

  }
}

export const fetchCountries = async () => {
try {
const {data: {countries}} = await axios.get(`${url}/countries`)
return countries.map((country) => country.name)
} catch(err) {
  console.log(err)

}
}


