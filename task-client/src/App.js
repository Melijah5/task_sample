import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  //create a state
  const [task, setTask]= useState('')

  const [taskList, setTaskList] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    Axios.post('http://localhost:9000/create', {
      task: task
    }).then(()=>{
      console.log('post data')
    })
    // .then(() => {
    //   setTaskList([...taskList,{
    //     task: task
    //   }])
    // })
  }
  // console.log(task)


  //// get request
  const getTask = () =>{
    Axios.get('http://localhost:9000/tasks')
    .then((res) =>{
      // console.log(res)
      setTaskList(res.data)
    })
  }

  console.log(taskList)

  //update task
  const updateTask = (id) =>{
    Axios.put('http://localhost:9000/update', { task: newTask, id: id }).then((res)=>{
      setTaskList(taskList.map((task)=>{
        return task.id === id ? { task: newTask, id: id }: task
      }))
    })
  }


  //delete the task

  const deleteTask = (id) =>{
    Axios.delete(`http://localhost:9000/delete/${id}`)

    setTaskList(taskList.filter((task)=>{
      return task.id !== id
    }))

  }
  

  const handleChange = e => {
    setTask(e.target.value)
  }


  return (
    <div className="App">
    <label>Task</label>
      <input type="text" name='task' onChange={handleChange}/>
      <button onClick={addTask} >Add Task</button>
      <button onClick={getTask} >show Task</button>
      {taskList.map((task, index)=>{
        return(
          <div>
          <div key={task.id}>
            <h3>Task: {task.taskname}</h3>
          </div>
          <div>
              <input type="text" onChange={(e) => { setNewTask(e.target.value)}}/>

              <button onClick={() => {updateTask(task.id)}}>Update</button>

              <button onClick={() => { deleteTask(task.id) }}>Delete</button>
          </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
