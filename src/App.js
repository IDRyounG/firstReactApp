import { useState, useEffect } from "react"

//Component imports
import Header from './Components/Header'
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';

function App() {
  const [tasks, setTasks] = useState( [])

    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
    
      getTasks()
    }, [])

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      return data
    }

    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }

    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method:'DELETE'
      })
      getTasks()
    }

    const toggleReminder = async (id) => {
      const taskAlteracao = await fetchTask(id)

      const updateTask = {...taskAlteracao, reminder: !taskAlteracao.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method:'PUT',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(updateTask)
      })
      getTasks()

      // setTasks(tasks.map((task) => task.id === id ? {...task, reminder:!task.reminder} : task))
    }

    const addTask = async (task) => {

      const res = await fetch(`http://localhost:5000/tasks`, {
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(task)
      })
      getTasks()
      // setTasks([...tasks,newTask])
    }

    const toggleAddTask = () => {
      setShowAddTask(!showAddTask)
    }

  return (
    <div className="container">
      <Header onToggle={toggleAddTask} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks to show'}
      

    </div>
  );
}

export default App;
