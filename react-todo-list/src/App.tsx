import './App.css'
import { useEffect, useState } from 'react'
import Footer from './component/Footer'
import { Todo } from './types/Todo'
import Filter from './component/Filter'
import RemainingTodos from './component/RemainingTodos'
import TodoList from './component/TodoList'
import CreateTodoList from './component/CreateTodoList'


function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem("react-todos") || '[]'))
  useEffect(() => {
    localStorage.setItem("react-todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <CreateTodoList todos={todos} setTodos={setTodos} />
      <TodoList />
      <RemainingTodos />
      <hr />
      <Filter />
      <hr />
      <Footer todos={todos} setTodos={setTodos} />
    </>
  )

}

export default App
