import './App.css'
import Footer from './component/Footer'
import Filter from './component/Filter'
import RemainingTodos from './component/RemainingTodos'
import TodoList from './component/TodoList'
import CreateTodoList from './component/CreateTodoList'


function App(): JSX.Element {
  return (
    <>
      <CreateTodoList />
      <TodoList />
      <RemainingTodos />
      <hr />
      <Filter />
      <hr />
      <Footer />
    </>
  )
}

export default App
