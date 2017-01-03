import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-vr'
import {connect} from 'react-redux'

const renderScore = (id, score, local) => (
  <View style={styles.square} key={id}>
    <Text style={local?styles.text:styles.grayText}>
      {'P' + id + ':' + score}
    </Text>
  </View>
)

const renderScores = ({scores, id}) => (
  <View style={styles.board}>
    <View style={styles.row}>
      {Object.keys(scores).sort().map((key, index) => renderScore(index + 1, scores[key], key === id))}
    </View>
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
	  fontSize: 0.2,
	  marginTop: 0.05, // hack(jimp): textAlignVertical, alignItems and justifyContent don't seem to work...
	  textAlignVertical: 'center',
	},
  grayText: {
	  fontSize: 0.2,
	  marginTop: 0.05, // hack(jimp): textAlignVertical, alignItems and justifyContent don't seem to work...
	  textAlignVertical: 'center',
    color: 'gray',
	}
});

const mapStateToProps = (state, ownProps) => (
  {
    scores: state.scores,
    id: ownProps.client
  }
)

const mapDispatchToProps = (dispatch) => (
  {
  }
)

const Scores = connect(
  mapStateToProps,
  mapDispatchToProps,
)(renderScores);

export default Scores;
