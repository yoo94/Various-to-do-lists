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
  const [visibleFilter, setVisibleFilter] = useState("All")
  useEffect(() => {
    localStorage.setItem("react-todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <CreateTodoList todos={todos} setTodos={setTodos} />
      <TodoList visibleFilter={visibleFilter} todos={todos} setTodos={setTodos} />
      <RemainingTodos todos={todos} />
      <hr />
      <Filter visibleFilter={visibleFilter} setVisibleFilter={setVisibleFilter} />
      <hr />
      <Footer todos={todos} setTodos={setTodos} />
    </>
  )

}

export default App
