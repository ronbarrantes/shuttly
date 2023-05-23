import { useReducer } from 'react'

const initialState = { count: [0] }

type KeepCountAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'remove'; payload: { item: number } }

const countReducer = (state: typeof initialState, action: KeepCountAction) => {
  switch (action.type) {
    case 'increment':
      return { count: [...state.count, state.count.length] }
    case 'decrement':
      return { count: state.count.slice(0, state.count.length - 1) }
    case 'remove':
      return {
        count: state.count.filter((item) => item !== action.payload.item),
      }
    default:
      throw new Error()
  }
}

export const useKeepCount = () => {
  const [state, dispatch] = useReducer(countReducer, initialState)
  const increment = () => dispatch({ type: 'increment' })
  const decrement = () => dispatch({ type: 'decrement' })
  const remove = (item: number) =>
    dispatch({ type: 'remove', payload: { item } })
  return { state, increment, decrement }
}
