import React, { PureComponent } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class ColorPicker extends PureComponent {
  state = {
    animation: new Animated.Value(0),
    buttonAnimation: new Animated.Value(0),
    color: '#000',
    inputOpen: false,
  };

  _handleToggle = () => {
    const toValue = this._open ? 0 : 1;
    Animated.spring(this.state.animation, {
      toValue,
    }).start();
    this._open = !this._open;
  };

  toggleInput = () => {
    const { buttonAnimation } = this.state;
    const toValue = this._inputOpen ? 0 : 1;
    Animated.timing(buttonAnimation, {
      toValue,
      duration: 350,
    }).start();

    this._inputOpen = !this._inputOpen;
    this.setState({ inputOpen: this._inputOpen }, () => {
      !this.state.inputOpen ? this._input.getNode().blur() : this._input.getNode().focus();
    });
  };

  render() {
    const { color, animation, inputOpen, buttonAnimation } = this.state;

    const colorStyle = { backgroundColor: color };

    const scaleXInterpolate = animation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
    });

    const translateYInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0],
    });

    const rowStyles = {
      opacity: animation,
      transform: [
        { translateY: translateYInterpolate },
        { scaleX: scaleXInterpolate },
        { scaleY: animation },
      ],
    };

    const moveInterpolate = buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    const buttonStyle = {
      transform: [
        {
          translateX: moveInterpolate,
        },
        {
          scale: buttonAnimation,
        },
      ],
    };

    const colorRowInterpolate = buttonAnimation.interpolate({
      inputRange: [0, 0.01],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const colorRowStyles = {
      opacity: colorRowInterpolate,
    };

    const inputOpacityInterpolate = buttonAnimation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
    });

    const inputStyle = {
      opacity: inputOpacityInterpolate,
    };

    const iconTranslate = buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });

    const opacityIconInterpolate = buttonAnimation.interpolate({
      inputRange: [0, 0.2],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const iconStyle = {
      opacity: opacityIconInterpolate,
      transform: [
        {
          translateX: iconTranslate,
        },
      ],
    };
    return (
      <View style={container}>
        <Animated.View style={[rowStyles, rowWrap]}>
          <TouchableWithoutFeedback onPress={this.toggleInput}>
            <Animated.View style={[colorBall, colorStyle]} />
          </TouchableWithoutFeedback>

          <View style={row}>
            <TouchableOpacity>
              <AnimatedIcon name="bold" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon name="italic" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon name="align-center" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon name="link" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>

            <Animated.View
              style={[StyleSheet.absoluteFill, colorRowWrap, colorRowStyles]}
              pointerEvents={inputOpen ? 'auto' : 'none'}
            >
              <AnimatedTextInput
                value={color}
                style={[input, inputStyle]}
                onChangeText={color => this.setState({ color })}
                ref={input => (this._input = input)}
              />
              <TouchableWithoutFeedback onPress={this.toggleInput}>
                <Animated.View style={[okayButton, buttonStyle]}>
                  <Text style={okayText}>OK</Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        </Animated.View>

        <TouchableOpacity onPress={this._handleToggle} style={buttonStyles}>
          <Text>Toggle open/closed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyles: {
    marginTop: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 300,
    borderRadius: 150,
    elevation: 3,
    paddingVertical: 4,
    height: 80,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
  },
  colorBall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  colorRowWrap: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5,
  },
  input: { flex: 1, paddingVertical: 8 },
  okayButton: {
    borderRadius: 20,
    height: '100%',
    width: 40,
    backgroundColor: '#309EEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  okayText: { color: '#ffffff' },
});
const {
  container,
  buttonStyles,
  rowWrap,
  colorBall,
  row,
  colorRowWrap,
  input,
  okayButton,
  okayText,
} = styles;
