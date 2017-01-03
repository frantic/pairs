import { combineReducers } from 'redux'
import board from './board'
import scores from './scores'


const reducers = combineReducers({
  board,
  scores
})

const app = (state, action) => {
  if (action.type === 'SET_STATE') {
    return Object.assign({}, action.state)
  }
  return reducers(state, action)
}

export default app
