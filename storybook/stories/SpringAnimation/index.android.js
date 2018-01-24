import React, { PureComponent } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
/*
  * Spring animation function
*/
export default class SpringAnimation extends PureComponent {
  state = {
    animation: new Animated.Value(1),
  };
  _startAnimation = () => {
    Animated.spring(this.state.animation, {
      toValue: 2,
      friction: 9,
      tension: 140,
    }).start(() => {
      this.state.animation.setValue(1);
    });
  };

  render() {
    const { animation } = this.state;
    const scaleStyles = {
      transform: [
        {
          scale: animation,
        },
      ],
    };

    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <Animated.View style={[container, scaleStyles, styles.wrap1]} />
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
  container1: {
    width: 320,
    height: 450,
    position: 'relative',
  },
  wrap1: {
    backgroundColor: 'cyan',
  },
  wrap2: {
    position: 'absolute',
  },
});

export const { container, container1, wrap1, wrap2 } = styles;
