import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";


const RemainingTodos = () => {
  const todos = useAppSelector(state => state.todos)
  const numberRemainingTodos = useMemo(() => todos.filter(todo => !todo.completed).length, [todos])
  return (
    <>
      <div>남은 할일: {numberRemainingTodos}</div>
    </>
  )
};
export default RemainingTodos;