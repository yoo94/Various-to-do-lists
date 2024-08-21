import { Dispatch, SetStateAction } from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import { todosState } from "../recoil/atoms/todoState";
import { useRecoilState, useRecoilValue } from "recoil";
import { visibilityFilterState } from "../recoil/atoms/visibilityFilter";


const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const visibleFilter = useRecoilValue(visibilityFilterState);

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