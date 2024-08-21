import { atom } from 'recoil'
import { Todo } from '../../types/Todo'


export const todosState = atom<Todo[]>(
  {
    key: "todosState",
    default: []
  }
)