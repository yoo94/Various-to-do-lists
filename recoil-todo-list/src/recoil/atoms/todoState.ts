import { atom } from 'recoil'
import { Todo } from '../../types/Todo'
import { createLocalstorageEffect } from '../effects/createLocalStorageEffect'


export const todosState = atom<Todo[]>(
  {
    key: "todosState",
    default: [],
    effects: [createLocalstorageEffect("react-todos", [])]
  }
)