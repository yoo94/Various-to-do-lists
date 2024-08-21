import { atom } from 'recoil'
import { createLocalstorageEffect } from '../effects/createLocalStorageEffect'


export const visibilityFilterState = atom<string>(
  {
    key: "visibilityFilterState",
    default: 'All',
    effects: [createLocalstorageEffect("vf", "All")]
  }
)