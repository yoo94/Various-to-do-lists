import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import { useAppSelector } from "../app/hooks";


const TodoList = () => {
  const { visibilityFilter, todos } = useAppSelector(state => state);
  const filterTodo = (() => {
    switch (visibilityFilter) {
      case 'All': return todos;
      case 'Active': return todos.filter(todo => !todo.completed);
      case 'Completed': return todos.filter(todo => todo.completed);
    }
    return todos;
  })()
  return (
    <ol>
      {filterTodo.map((todo: Todo) =>
        <TodoItem todoItem={todo} />
      )}
    </ol>
  )
}
export default TodoList;