var cron = require('node-cron');
const {addMonthlyStatistics} =  require('../services/monthly_statistics')
const {getStatistics, deleteStatistics} = require('../services/statistics')

cron.schedule('0 0 1 1-12 *', () => {
     let monthly_incomes = []
     let monthly_sales = []
     let month = new Date().getMonth()
     getStatistics().then(statistics => {
          statistics.forEach(element => {
               const incomes = JSON.parse((JSON.stringify(element.income)));
               const sales = JSON.parse((JSON.stringify(element.sales)));
               monthly_incomes.push(incomes)
               monthly_sales.push(sales)
          })
     }).catch(error => console.log(error))
     const data = {monthly_sales, monthly_incomes, month}
     addMonthlyStatistics(data).then(
          deleteStatistics()
     )
});
