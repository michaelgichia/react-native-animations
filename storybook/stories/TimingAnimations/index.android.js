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

/*
 * Animating scale with timing.
*/
export class ScaleAnimations extends PureComponent {
  state = {
    animation: new Animated.Value(1),
  };
  _startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 3,
      duration: 900,
    }).start(() => {
      this.state.animation.setValue(1);
    });
  };
  render() {
    const { animation } = this.state;
    const scaleStyles = { transform: [{ scale: animation }] };
    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <Animated.View style={[styles.container, styles.wrap1, scaleStyles]} />
      </TouchableWithoutFeedback>
    );
  }
}

/*
 * Animating width and height with timing.
*/
export class WidthHeightAnimations extends PureComponent {
  state = {
    animationWidth: new Animated.Value(200),
    animationHeight: new Animated.Value(200),
  };
  _startAnimation = () => {
    Animated.timing(this.state.animationWidth, {
      toValue: 400,
      duration: 600,
    }).start(() => {
      Animated.timing(this.state.animationHeight, {
        toValue: 300,
        duration: 300,
      }).start(() => {
        this.state.animationWidth.setValue(200);
        this.state.animationHeight.setValue(200);
      });
    });
  };
  render() {
    const { animationHeight, animationWidth } = this.state;
    const viewStyles = { width: animationWidth, height: animationHeight };
    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <Animated.View style={[viewStyles, styles.wrap1]} />
      </TouchableWithoutFeedback>
    );
  }
}

/*
 * Animating View with absolute position.
*/
export class AbsolutePosition extends PureComponent {
  state = {
    animation: new Animated.Value(0),
  };
  _startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 600,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 300,
      }).start();
    });
  };
  render() {
    const { animation } = this.state;
    const topStyles = { top: animation };
    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <View style={styles.container1}>
          <Animated.View style={[styles.container, topStyles, styles.wrap1, styles.wrap2]} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

/*
 * Animating width and height.
*/
export class WidthHeightInterpolation extends PureComponent {
  state = {
    animationWidth: new Animated.Value(0),
    animationHeight: new Animated.Value(0),
  };
  _startAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.animationWidth, {
        toValue: 1,
        duration: 600,
      }).start(() => {
        Animated.timing(this.state.animationWidth, {
          toValue: 0,
          duration: 300,
        }).start();
      }),
      Animated.timing(this.state.animationHeight, {
        toValue: 1,
        duration: 600,
      }).start(() => {
        Animated.timing(this.state.animationHeight, {
          toValue: 0,
          duration: 600,
        }).start();
      }),
    ]);
  };
  render() {
    const { animationWidth, animationHeight } = this.state;
    const widthStyles = {
      width: animationWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['30%', '100%'],
      }),
    };
    const heightStyles = {
      height: animationHeight.interpolate({
        inputRange: [0, 1],
        outputRange: ['20%', '100%'],
      }),
    };

    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
        <View style={styles.container1}>
          <Animated.View style={[widthStyles, heightStyles, styles.wrap1]} />
        </View>
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
