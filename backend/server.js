const express = require('express')
const app=express()
const mysql = require('mysql') 
const cors = require('cors')


app.use(cors())

app.use(express.json())

const db = mysql.createConnection({
    user: 'taskuser',
    host: 'localhost',
    password: 'taskuser',
    database: 'tasks'
})

//Route
//front >> database


app.get('/tasks',(req, res)=>{
    db.query('SELECT * FROM tasktable',(err,result)=>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/create' , (req,res) =>{
    console.log(req.body)
    const task = req.body.taskname

    db.query('INSERT INTO tasktable(taskname) VALUES (?)',[task],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/update',(req, res)=>{

    console.log(req.body)

    const id = req.body.id
    const task = req.body.task

    db.query('UPDATE tasktable SET taskname= ? WHERE id= ? ', [task, id], (err, result)=>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id

    db.query('DELETE FROM tasktable WHERE id= ?', id, (err, result)=>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(9000, () => {
    console.log('task database connected with port number 9000')
})

