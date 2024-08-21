import { selector } from "recoil";
import { todosState } from "../atoms/todoState";
import { visibilityFilterState } from "../atoms/visibilityFilterState";


export const FilterValues = selector(
  {
    key: "FilterValues",
    get: ({ get }) => {
      const todos = get(todosState)
      const visibilityFilter = get(visibilityFilterState);
      switch (visibilityFilter) {
        case 'All': return todos;
        case 'Active': return todos.filter(todo => !todo.completed);
        case 'Completed': return todos.filter(todo => todo.completed);
      }
      return todos;

    }
  }
)