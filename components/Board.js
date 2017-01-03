import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-vr'
import {connect} from 'react-redux'

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

// TODO(jimp): better styling...
const styles = StyleSheet.create({
	board: {
	  transform: [{translate: [-0.82, 0.82, -3]}],
	},
	row: {
	  flex: 0,
	  flexDirection: 'row',
	},
	square: {
	  width: 0.45,
	  height: 0.45,
	  borderWidth: 0.01,
	  borderColor: 'white',
	  margin: 0.05,
	  flex: 0,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	text: {
	  fontSize: 0.4,
	  marginTop: 0.05, // HACK(jimp): textAlignVertical, alignItems and justifyContent don't seem to work...
	  textAlignVertical: 'center',
	},
});

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
