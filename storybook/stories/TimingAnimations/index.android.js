import React, { PureComponent } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

/*
 * Animating opacity on and off with timing.
*/
export class OpacityAnimations extends PureComponent {
  state = {
    animation: new Animated.Value(1),
  };
  _startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 900,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 300,
      }).start();
    });
  };
  render() {
    const { animation } = this.state;
    const opacityStyles = { opacity: animation };
    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <Animated.View style={[styles.container, styles.wrap1, opacityStyles]} />
      </TouchableWithoutFeedback>
    );
  }
}

/*
 * Animating translate with timing.
*/
export class TransformAnimations extends PureComponent {
  state = {
    animation: new Animated.Value(0),
  };
  _startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 400,
      duration: 900,
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };
  render() {
    const { animation } = this.state;
    const translateStyles = { transform: [{ translateY: animation }] };
    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <Animated.View style={[styles.container, styles.wrap1, translateStyles]} />
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
