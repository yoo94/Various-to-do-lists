import { Dispatch, SetStateAction } from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  visibleFilter: string
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}
const TodoList = ({ visibleFilter, todos, setTodos }: TodoListProps) => {
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
        <TodoItem todoItem={todo} todos={todos} setTodos={setTodos} />
      )}
    </ol>
  )
}
export default TodoList;