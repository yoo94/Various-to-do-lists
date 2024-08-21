import { useMemo } from "react";
import { Todo } from "../types/Todo";

interface RemainingTodosProps {
  todos: Todo[];
}
const RemainingTodos = ({ todos }: RemainingTodosProps) => {
  const numberRemainingTodos = useMemo(() => todos.filter(todo => !todo.completed).length, [todos])
  return (
    <>
      <div>남은 할일: {numberRemainingTodos}</div>
    </>
  )
};
export default RemainingTodos;