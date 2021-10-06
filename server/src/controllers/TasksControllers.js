const pool = require('../database/connection')
const ctrl = {}

ctrl.create = async (req, res) => {
    const {title, description} = req.body
    await pool.query('INSERT INTO tasks SET ?', {title,description})
   res.json('Añadido exitosamente.')
}


ctrl.tasks = async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks')
    res.json(result)
}

ctrl.task_id = async (req, res) => {
    const {id} = req.params
    const result = await pool.query('SELECT * FROM tasks WHERE id = ?', id)
    res.json(result[0])
}

ctrl.edit = async (req, res) => {
    const {title, description} = req.body
    const {id} = req.params 
    const obj = { title, description}
    await pool.query('UPDATE tasks SET ? WHERE id = ? ', [obj,id]) 
    res.json('Actualizado satifactoriamente.')
}

ctrl.trash = async (req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM tasks WHERE id = ?', id)
    res.json('Tarea eliminada satifactoriamente.')
}

module.exports=ctrl