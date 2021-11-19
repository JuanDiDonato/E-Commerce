var cron = require('node-cron');
const pool = require('../database/connection')

cron.schedule('0 0 1 1-12 *', async () => {
     let monthly_incomes = []
     let monthly_sales = []
     const data = await pool.query('SELECT income,sales FROM statistics')
     let month = new Date().getMonth()
     data.forEach(element => {
          const incomes = JSON.parse((JSON.stringify(element.income)));
          const sales = JSON.parse((JSON.stringify(element.sales)));
          monthly_incomes.push(incomes)
          monthly_sales.push(sales)
     });
     try {
          await pool.query('INSERT INTO monthly_statistics VALUES("'+monthly_incomes+'","'+monthly_sales+'",'+month+')')
     } catch (error) {
          console.log(error);
     }
     await pool.query('DELETE FROM statistics')
     res.status(200).json({ error: false })
});
