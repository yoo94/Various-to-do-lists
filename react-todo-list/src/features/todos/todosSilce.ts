import { createSlice } from '@reduxjs/toolkit'
import { Todo } from '../../types/Todo'


export const todosSlice = createSlice({
  name: 'visibilityFilter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: JSON.parse(localStorage.getItem("react-todos") || '[]') as Todo[],
  reducers: {
    _completeTodoToggle: (todos, action) => {
      const target = action.payload;
      const todo = todos.find(todo => todo.id == target.id);
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    _deleteTodo: (todos, action) => {
      const target = action.payload;
      return todos.filter((todo) => todo.id !== target.id)
    },
    _updateTodoTitle: (todos, action) => {
      const { target, title } = action.payload;
      const todo = todos.find(todo => todo.id == target.id);
      if (todo) {
        todo.title = title
      }
    },
    _createTodo: (todos, action) => {
      const id = todos.length + 1
      const title = action.payload;
      const completed = false
      const newTodo = { id, title, completed }
      todos.push(newTodo)
    },
    _allCompletedToggle: (todos) => {
      const allChecked = todos.every(todo => todo.completed);
      return todos.map(todo => ({ ...todo, completed: !allChecked }))
    },
    _dleteCompletedTodos: (todos) => {
      return todos.filter(todo => !todo.completed)
    }
  }
})

export const { _completeTodoToggle, _deleteTodo, _updateTodoTitle, _createTodo, _allCompletedToggle, _dleteCompletedTodos } = todosSlice.actions
export default todosSlice.reducer