import React from 'react'
import {
  Text,
  View,
  VrButton,
} from 'react-vr'
import {connect} from 'react-redux'
import styles from './styles'

const renderSquare = (value, rowIndex, columnIndex, onSquareClick) => (
  <VrButton onClick={() => onSquareClick(rowIndex, columnIndex, value)} key={rowIndex + ':' + columnIndex}>
    <View style={styles.square}>
      <Text style={styles.text}>
        {value > 0? value:''}
      </Text>
    </View>
  </VrButton>
)

const renderRow = (row, rowIndex, board, onSquareClick) => (
  <View style={styles.row} key={row}>
    {row.map((column, columnIndex) => renderSquare(
        board[rowIndex][columnIndex], rowIndex, columnIndex, onSquareClick)
    )}
  </View>
)

const renderBoard = ({ board, onSquareClick }) => (
  <View style={styles.board}>
    {board.map((row, rowIndex) =>
      renderRow(row, rowIndex, board, onSquareClick)
    )}
  </View>
)

const mapStateToProps = (state) => (
  {
    board: state.board
  }
)

const showSquare = (rowIndex, columnIndex, client) => (
  {
    type: 'SHOW',
    square: {row: rowIndex, column: columnIndex},
    client: client
  }
)

const hideSquare = (rowIndex, columnIndex, client) => (
  {
    type: 'HIDE',
    square: {row: rowIndex, column: columnIndex},
    client: client
  }
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {
	  onSquareClick: (rowIndex, columnIndex, value) => {
      if (value > 0) {
        return;
      }
      dispatch(showSquare(rowIndex, columnIndex, ownProps.client))
      setTimeout(() => {
        dispatch(hideSquare(rowIndex, columnIndex, ownProps.client))
      }, 1000)
    }
  }
)

const Board = connect(
  mapStateToProps,
  mapDispatchToProps,
)(renderBoard);

export default Board;
