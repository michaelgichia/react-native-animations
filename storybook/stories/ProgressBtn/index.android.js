import React, { Component } from 'react';
import { Animated, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default class ProgressBtn extends Component {
  state = {
    animated: new Animated.Value(0),
    animatedOpacity: new Animated.Value(1),
  };

  _handlePress = () => {
    this.state.animatedOpacity.setValue(1);
    this.state.animated.setValue(0);

    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 1500,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(this.state.animatedOpacity, {
          toValue: 0,
          duration: 300,
        }).start();
      }
    });
  };

  render() {
    const { animated, animatedOpacity } = this.state;
    const bgColorStyles = {
      backgroundColor: animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['cyan', 'skyblue'],
      }),
    };
    const widthStyles = {
      width: animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      }),
      bottom: 0,
    };

    const opacityStyles = { opacity: animatedOpacity };

    return (
      <TouchableWithoutFeedback key="reload" onPress={this._handlePress}>
        <View style={button}>
          <Animated.View style={[progress, widthStyles, bgColorStyles, opacityStyles]} />
          <Text style={buttonText}>Login</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e6537d',
    borderRadius: 35,
    width: 260,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    backgroundColor: 'transparent',
  },
  progress: {
    position: 'absolute',
    backgroundColor: 'cyan',
    top: 0,
    left: 0,
  },
});
const { button, buttonText, progress } = styles;
