import React, {useState, useEffect} from 'react'
import AdminServices from '../../Services/AdminServices';
//Chartjs
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
//Moment
import moment from 'moment'
import 'moment/locale/es'
//CUSTOM CSS
import '../../assets/css/statistics.css'

var lodash = require('lodash');
export default function Statistics() {

     const [statistics, setStatistics] = useState([])
     const [mstatistics, setMstatistics] = useState([])

     useEffect(() => {
          AdminServices.statistics().then(data => {
               setStatistics(data)
               
          })
          AdminServices.Mstatistics().then(data => {
               setMstatistics(data)
               console.log(data);
          })
     }, [])
     

     let date = []
     // eslint-disable-next-line
     statistics.map(statistic => {
          date.push(moment(statistic.last_updated).fromNow())
     })

     let sales = []
     // eslint-disable-next-line
     statistics.map(statistic => {
          sales.push(statistic.sales)
     })

     let incomes = []
     // eslint-disable-next-line
     mstatistics.map(statistic => {
          incomes.push(statistic.income)
     })

     let month = []
     // eslint-disable-next-line
     mstatistics.map(mstatistic => {
          month.push(mstatistic.month)
     })

     let MonthIncomes = []
     let MonthSales = []
     // eslint-disable-next-line
     mstatistics.map(mstatistic => {
          const total_incomes = mstatistic.monthly_incomes.split(',')
          const total_sales = mstatistic.monthly_sales.split(',')
          let total_income = []
          let total_sale = []
          total_incomes.forEach(element => {
               total_income.push(Number(element))
          });
          total_sales.forEach(element => {
               total_sale.push(Number(element))
          });
          var sumIncomes = lodash.sum(total_income);
          var sumSales = lodash.sum(total_sale);
          MonthIncomes.push(sumIncomes)
          MonthSales.push(sumSales)
     })


     const MonthlyIncomes = {
          labels: month,
          datasets: [
            {
              label: 'Ingresos',
              data: MonthIncomes,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
     };

     const MonthlySales = {
          labels: month,
          datasets: [
            {
              label: 'Ventas',
              data: MonthSales,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
     };

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

     const MonthIncome = () => (
          <>
            <div className='header'>
              <h1 className='title'>Ingresos por mes</h1>
            </div>
            <Bar data={MonthlyIncomes}  />
          </>
     );

     const MonthSale = () => (
          <>
            <div className='header'>
              <h1 className='title'>Ventas por mes</h1>
            </div>
            <Bar data={MonthlySales}  />
          </>
     );

     return (
          <div className="statistics-grid">
               <div>
                    {Sales()}
                    {MonthSale()}
                    
                    
               </div>
               <div>
                    {Incomes()}
                    {MonthIncome()}
               </div>
          </div>
     )
}
