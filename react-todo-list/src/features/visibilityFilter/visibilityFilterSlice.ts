import { createSlice } from '@reduxjs/toolkit'


export const visibilityFilterSlice = createSlice({
  name: 'visibilityFilter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: "All",
  reducers: {
    viewAll: () => {
      return 'All'
    },
    viewActive: () => {
        return 'Active'
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    viewCompleted: () => {
        return 'Completed'
    }
  }
})

export const { viewAll, viewActive, viewCompleted } = visibilityFilterSlice.actions
export default visibilityFilterSlice.reducer