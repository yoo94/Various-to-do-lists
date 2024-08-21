import { createSlice } from '@reduxjs/toolkit'
import { Todo } from '../../types/Todo'


export const todosSlice = createSlice({
  name: 'visibilityFilter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [
    {id:1, title:'ddd', completed:false},
    {id:2, title:'ddssd', completed:true}
  ] as Todo[],
  reducers: {
    _completeTodoToggle:(todos,action) => {
        const target = action.payload;
        const todo = todos.find(todo => todo.id == target.id);
        if (todo){
            todo.completed = !todo.completed
        }
    },
    _deleteTodo: (todos, action) => {
        const target = action.payload;
        return todos.filter((todo) => todo.id !== target)
    },
    _updateTodoTitle: (todos, action) => {
        const {target,title} = action.payload;
        const todo = todos.find(todo => todo.id == target.id);
        if (todo){
            todo.title = title
        }
    }
  }
})

export const { _completeTodoToggle,_deleteTodo,_updateTodoTitle } = todosSlice.actions
export default todosSlice.reducer