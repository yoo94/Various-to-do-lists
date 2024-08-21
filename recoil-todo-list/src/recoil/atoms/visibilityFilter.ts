import { atom } from 'recoil'
import { Todo } from '../../types/Todo'


export const visibilityFilterState = atom<string>(
  {
    key: "visibilityFilterState",
    default: 'All'
  }
)