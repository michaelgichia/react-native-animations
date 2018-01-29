import React, { PureComponent } from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

export default class Questionnares extends PureComponent {
  state = {
    index: 0,
    questions: [
      '1. Do you tend to follow directions when given?',
      '2. Are you comfortable with the idea of standing and doing light physical activity most of the day?',
      '3. Would you enjoy making sure your customers leave happy?',
      '4. Are you willing to work nights and weeddkends (and possibly holidays)?',
    ],
    animation: new Animated.Value(0),
    progress: new Animated.Value(0),
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.index >= nextState.questions.length) {
      this.setState({ index: 0 });
      this.state.progress.setValue(0);
    }
  }

  _handleTranslation = () => {
    Animated.parallel([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 300,
      }),
      Animated.timing(this.state.progress, {
        toValue: this.state.index + 1,
        duration: 300,
      }),
    ]).start(() =>
      this.setState(
        state => ({
          index: state.index + 1,
        }),
        () => this.state.animation.setValue(0),
      ),
    );
  };

  render() {
    const { questions, index, animation, progress } = this.state;
    const { width } = Dimensions.get('window');

    const btnOneInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width],
    });
    const btnTwoInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0],
    });
    const btnTwoTranslate = {
      transform: [
        {
          translateX: btnTwoInterpolation,
        },
      ],
    };
    const btnOneTranslate = {
      transform: [
        {
          translateX: btnOneInterpolation,
        },
      ],
    };

    const progressInterpolate = progress.interpolate({
      inputRange: [0, questions.length],
      outputRange: ['0%', '100%'],
    });

    const progressStyle = {
      width: progressInterpolate,
    };

    const questionOne = questions[index];
    let questionTwo;
    if (index + 1 < questions.length) {
      questionTwo = questions[index + 1];
    }

    return (
      <View style={container}>
        <View style={[questionsContainer, StyleSheet.absoluteFill]}>
          <View style={[questionsWrap]}>
            <Animated.Text style={[qstn, btnOneTranslate]}>{questionOne}</Animated.Text>
            <Animated.Text style={[qstn, btnTwoTranslate]}>{questionTwo}</Animated.Text>
          </View>
          <Animated.View style={[progressWrap, progressStyle]} />
        </View>
        <TouchableOpacity onPress={this._handleTranslation} style={[btn]}>
          <Text style={text}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleTranslation} style={[btn, btnTwo]}>
          <Text style={text}>No</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    marginBottom: 32,
    color: '#ffffff',
    fontSize: 28,
  },
  btnTwo: {
    backgroundColor: 'rgba(250,250,250, .1)',
  },
  questionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionsWrap: {
    width: '100%',
    height: 100,
  },
  qstn: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 29,
    paddingHorizontal: 8,
  },
  progressWrap: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 10,
    backgroundColor: '#ffffff',
  },
});

const {
  container,
  btn,
  text,
  btnTwo,
  questionsContainer,
  qstn,
  questionsWrap,
  progressWrap,
} = styles;
