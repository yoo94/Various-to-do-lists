import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import { useRecoilValue } from "recoil";
import { FilterValues } from "../recoil/selectors/FilterValue";


const TodoList = () => {
  const filterTodo = useRecoilValue(FilterValues)
  return (
    <ol>
      {filterTodo.map((todo: Todo) =>
        <TodoItem key={todo.id} todoItem={todo} />
      )}
    </ol>
  )
}
export default TodoList;