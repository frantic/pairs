import React from 'react'
import {
  Text,
  View,
  VrButton,
} from 'react-vr'
import {connect} from 'react-redux'
import styles from './styles'

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
