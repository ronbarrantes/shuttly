import { useReducer } from 'react'

const initialState = { count: [0], lastIndex: 0 }

type KeepCountAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'remove'; payload: { item: number } }
  | { type: 'reset' }

const countReducer = (state: typeof initialState, action: KeepCountAction) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        lastIndex: state.lastIndex + 1,
        count: [...state.count, state.lastIndex + 1],
      }
    case 'decrement':
      return {
        ...state,
        count: state.count.filter(
          (item) => item !== state.count[state.count.length - 1]
        ),
      }

    case 'remove':
      return {
        ...state,
        count: state.count.filter((item) => item !== action.payload.item),
      }

    case 'reset':
      return initialState

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

  const reset = () => dispatch({ type: 'reset' })
  return { count: state.count, increment, decrement, remove, reset }
}
