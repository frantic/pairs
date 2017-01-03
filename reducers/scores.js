const initialState = () => ({
})

export default(state = initialState(), action) => {
  let result
  switch(action.type) {
  case 'JOIN':
    result = Object.assign({}, state)
    result[action.client] = 0
    return result
  case 'SCORE':
    result = Object.assign({}, state)
    result[action.client] = action.score
    return result
  default:
    return state
  }
}
