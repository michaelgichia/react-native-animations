import React, { Component } from 'react';
import { StyleSheet, View, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';

export default class SequenceAnimation extends Component {
  state = {
    animation: new Animated.ValueXY(),
  };
  _startAnimation = () => {
    const { width, height } = Dimensions.get('window');
    // console.warn({ width, height });
    Animated.sequence([
      Animated.spring(this.state.animation.y, {
        toValue: height - this._height,
      }),
      Animated.spring(this.state.animation.x, {
        toValue: width - this._width,
      }),
      Animated.spring(this.state.animation.y, {
        toValue: 0,
      }),
      Animated.spring(this.state.animation.x, {
        toValue: 0,
      }),
    ]).start();
  };

  saveDimensions = e => {
    this._width = e.nativeEvent.layout.width;
    this._height = e.nativeEvent.layout.height;
  };

  render() {
    const animatedStyles = {
      transform: this.state.animation.getTranslateTransform(),
    };

    return (
      <View style={container}>
        <TouchableWithoutFeedback onPress={this._startAnimation} onLayout={this.saveDimensions}>
          <Animated.View style={[box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export const { container, box } = styles;
