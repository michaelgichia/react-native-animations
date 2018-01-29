import React, { PureComponent } from 'react';
import { Animated, View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

export default class FabBtn extends PureComponent {
  state = {
    btnElevation: 6,
  };
  _onPressButton = () => {};

  render() {
    const { btnElevation } = this.state;
    const Elevation = { elevation: btnElevation };
    return (
      <View key="test" style={[wrapper, Elevation]}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.3)', true)}
          onPress={this._onPressButton}
          onPressIn={() =>
            this.setState(state => ({ btnElation: state.btnElation === 6 ? 12 : 6 }))
          }
        >
          <View style={insideWrapper}>
            <Text style={text}>&times;</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    position: 'relative',
    backgroundColor: '#ffffffff',
  },
  insideWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

const { wrapper, text, insideWrapper } = styles;
