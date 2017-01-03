const width = 3
const height = 3

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const initialState = () => {
  const maxValue = Math.ceil((width * height) / 2)
  let values = [...Array(maxValue).keys()] // [0...maxValue]
  values = values.map(value => -(value + 1)) // [1...-(maxValue + 1)]
  values.push(...values) // [1...-(maxvalue),1...-(maxValue)]
  values = shuffle(values)
  return Array.apply(null, Array(height)).map(() => {
    return values.splice(0, width) // fill row with first width values
  })
}

const copyState = (state) => {
  return state.slice().map((value) => {
    return value.slice()
  })
}

export const countValues = (state, value) => {
  return state.reduce((acc, row) => {
    return row.reduce((acc, element) => {
      if (element === value) {
        return acc + 1
      }
      return acc
    }, acc)
  }, 0)
}

export default(state = initialState(), action) => {
  let result
  let value
  switch(action.type) {
  case 'SHOW':
    result = copyState(state)
    value = state[action.square.row][action.square.column]
    result[action.square.row][action.square.column] = Math.abs(value)
    return result
  case 'HIDE':
    result = copyState(state)
    value = state[action.square.row][action.square.column]
    if (countValues(state, value) !== 2) {
      result[action.square.row][action.square.column] = -(Math.abs(value))
    }
    return result
  default:
    return state
  }
}
