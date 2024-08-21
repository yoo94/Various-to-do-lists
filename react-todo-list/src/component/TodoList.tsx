import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import { useAppSelector } from "../app/hooks";


const TodoList = () => {
  const todos = useAppSelector(state => state.todos);
  const visibleFilter = useAppSelector(state => state.visibilityFilter);
  const filterTodo = (() => {
    switch (visibleFilter) {
      case 'All': return todos;
      case 'Active': return todos.filter(todo => !todo.completed);
      case 'Completed': return todos.filter(todo => todo.completed);
    }
    return todos;
  })()
  return (
    <ol>
      {filterTodo.map((todo: Todo) =>
        <TodoItem todoItem={todo} todos={todos}/>
      )}
    </ol>
  )
}
export default TodoList;