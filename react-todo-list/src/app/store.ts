import { configureStore } from '@reduxjs/toolkit'
import visibilityFilterSlice from '../features/visibilityFilter/visibilityFilterSlice'
import todosSlice from '../features/todos/todosSilce'

const store = configureStore({
  reducer: {
    visibilityFilter: visibilityFilterSlice,
    todos: todosSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store