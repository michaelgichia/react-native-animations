import React, { Component } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

export default class LoopAnimation extends Component {
  animation = new Animated.Value(0);

  _startAnimation = () => {
    Animated.loop(
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  };

  render() {
    const rotationStyle = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '1060deg'],
          }),
        },
      ],
    };
    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <Animated.View style={[container, wrap1, rotationStyle]} />
      </TouchableWithoutFeedback>
    );
  }
}

// Styles
export const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
  wrap1: {
    backgroundColor: 'cyan',
  },
});

export const { container, wrap1 } = styles;
