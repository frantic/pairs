import {StyleSheet} from 'react-vr'

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
	  textAlignVertical: 'center',
	},
  grayText: {
	  fontSize: 0.2,
	  textAlignVertical: 'center',
    color: 'gray',
	}
});

export default styles
