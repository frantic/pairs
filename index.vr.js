import React from 'react'
import { AppRegistry, View } from 'react-vr'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Board from './components/Board';
import Scores from './components/Scores';
import app from './reducers'
import { board, countValues } from './reducers/board'
import uuid from 'uuid'

const client = uuid()

// master is client with first sorted client id.
const isMasterClient = (clients) => {
  if (! clients) {
    return false;
  }
  let master = Object.keys(clients).sort()[0]
  return master === client
}

const setState = (state) => (
  {
    type: 'SET_STATE',
    state: state,
    sender: client
  }
)

const join = (client) => (
  {
    type: 'JOIN',
    client: client
  }
)

const score = (scores, client) => (
  {
    type: 'SCORE',
    client: client,
    score: scores[client] + 1
  }
)

const ws = new window.WebSocket('ws://localhost:4000')

// generate scores if master client
const scoreMaster = store => next => action => {
  let state = store.getState()
  if (isMasterClient(state.scores) && (action.type === 'SHOW')) {
    let value = state.board[action.square.row][action.square.column]
    if (countValues(state.board, Math.abs(value)) === 1) {

      // if one half of pair is visible now, both will be after
      // action is reduced, so generate score action.
      store.dispatch(score(state.scores, action.client))
    }
  }
  return next(action)
}

// send actions to other clients if not received over network
const sendAction = store => next => action => {

  if (! ('sender' in action)) {
    action.sender = client
    ws.send(JSON.stringify(action))
  }

  return next(action)
}

const store = createStore(
  app,
  applyMiddleware(scoreMaster, sendAction)
)

// read actions from network and dispatch locally
ws.onmessage = (evt) => {
  let action = JSON.parse(evt.data)
  console.log(action)

  // existing master client sends state to other clients after processing join
  let master = isMasterClient(store.getState().scores)

  // dispatch action locally
  store.dispatch(action)

  // sync state if join
  // TODO(jimp): only send state to new client...
  if (master && action.type === 'JOIN') {
    ws.send(JSON.stringify(setState(store.getState())))
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Board client={client}/>
          <Scores client={client}/>
        </View>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('pairs', () => App)

// HACK(jimp): delay to avoid mysterious crashes sending action at startup...
// TODO(jimp): avoid delay...
setTimeout(() => {store.dispatch(join(client))}, 100)
