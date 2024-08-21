import { selector } from "recoil";
import { todosState } from "../atoms/todoState";


export const remainingTodosvalue = selector(
  {
    key: "remainingTodosvalue",
    get: ({ get }) => {
      const todos = get(todosState)
      return todos.filter(todo => !todo.completed).length
    }
  }
)