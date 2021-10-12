import React, {useState, useEffect} from 'react'
import AdminServices from '../../Services/AdminServices';
//Chartjs
import { Line } from 'react-chartjs-2';
//Moment
import moment from 'moment'
import 'moment/locale/es'

export default function Statistics() {

     const [statistics, setStatistics] = useState([])

     useEffect(() => {
          AdminServices.statistics().then(data => {
               setStatistics(data)
          })
     }, [])
     


     let date = []
     statistics.map(statistic => {
          date.push(moment(statistic.last_updated).fromNow())
     })

     let sales = []
     statistics.map(statistic => {
          sales.push(statistic.sales)
     })

     let incomes = []
     statistics.map(statistic => {
          incomes.push(statistic.income)
     })

     const data_incomes = {
          labels: date,
          datasets: [
            {
              label: '# Ganancia',
              data: incomes,
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
     };

     const data_sales = {
          labels: date,
          datasets: [
            {
              label: '# Ventas',
              data: sales,
              fill: false,
              backgroundColor: 'rgb(0, 143, 255)',
              borderColor: 'rgba(0, 143, 255, 0.3)',
            },
          ],
     };

     const Sales = () => (
          <>
            <div className='header'>
              <h1 className='title'>Ventas</h1>
            </div>
            <Line data={data_sales} />
          </>
     );

     const Incomes = () => (
          <>
            <div className='header'>
              <h1 className='title'>Recaudacion</h1>
            </div>
            <Line data={data_incomes} />
          </>
     );

     return (
          <div>
               <div className=" container col-md-6 mt-5">
                    {Sales()}
               </div>
               <div className=" container col-md-6 mt-5">
                    {Incomes()}
               </div>
          </div>
     )
}
