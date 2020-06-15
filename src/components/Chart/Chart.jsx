import React, {useState, useEffect} from 'react'
import { fethcDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'
const Chart = ({data: {confirmed, recovered, deaths}, country}) => {

  // daily data is the current state
  //set daily data is the method that will allow us to to update the dailydata state
const [dailyData, setDailydata] = useState([])

useEffect(() => {
  const FetchApi = async() => {
    setDailydata(await fethcDailyData())
  }
  FetchApi();
}, []);

const lineChart = (
  dailyData.length?
  (<Line 
   data={{
    labels: dailyData.map(({ date }) => date),
    datasets: [{
      data: dailyData.map(({ confirmed }) => confirmed),
      label: 'INFECTED',
      borderColor: 'rgba(58, 15, 216, 0.5)',
      fill: true,
    }, {
      data: dailyData.map(({ deaths }) => deaths),
      label: 'Deaths',
      boarderColor: 'red',
      backgroundColor: 'rgba(255, 0, 0 , 0.5)',
      fill: true,
    }]
   }}
   />)
   :null
)

const barChart = (
  confirmed?
  (
    <Bar 
    data={{
      labels: ["INFECTED", "RECOVERED", "DEATHS"],
      datasets: [{
        label: 'people',
        backgroundColor: [
          'rgba(58, 15, 216, 0.5)',
          'rgba(13, 216, 9, 0.5)',
          'rgba(201, 11, 20, 0.5)',
        ],
        data: [confirmed.value, recovered.value, deaths.value]
      }]
    }}
    options = {{
      legend: {display: false},
      title: {display: true, text: `current state in ${country}`}
    }}
    />
  ):null
) 
  return(
    <div className={styles.container}>
    {country? barChart : lineChart}
    </div>
  )
}

export default Chart