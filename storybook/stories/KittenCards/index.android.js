import React, { Component } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';
import clamp from 'clamp';

import Cat1 from './images/cat1.jpg';
import Cat2 from './images/cat2.jpg';
import Cat3 from './images/cat3.jpg';
import Cat4 from './images/cat4.jpg';

const MaxDistance = 100;
const catsObj = [
  { id: 'catOne', image: Cat1, desc: 'Cute One' },
  { id: 'catTwo', image: Cat2, desc: 'Cute Two' },
  { id: 'catThree', image: Cat3, desc: 'Cute Three' },
  { id: 'catFive', image: Cat4, desc: 'Cute Five' },
  { id: 'catFour', image: Cat1, desc: 'Cute Four' },
  { id: 'catSix', image: Cat2, desc: 'Cute Six' },
  { id: 'catSeven', image: Cat3, desc: 'Cute Seven' },
  { id: 'catEight', image: Cat4, desc: 'Cute Eight' },
];

export default class KittenCards extends Component {
  state = {
    cats: [...catsObj],
  };
  cardAnimation = new Animated.ValueXY();
  opacity = new Animated.Value(1);
  nextItem = new Animated.Value(0.9);

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderRelease,
    });
  }

  _handlePanResponderMove = () => {
    Animated.event([
      null,
      {
        dx: this.cardAnimation.x,
        dy: this.cardAnimation.y,
      },
    ]);
  };

  _setCardDecay = (velocity, vy) => {
    Animated.decay(this.cardAnimation, {
      velocity: { x: velocity, y: vy },
      deceleration: 0.98,
    }).start(this._handleNextTransition);
  };

  _setCardSpring = () => {
    Animated.spring(this.cardAnimation, {
      toValue: { x: 0, y: 0 },
      friction: 4,
    }).start();
  };

  _handlePanResponderRelease = (evt, { dx, vx, vy }) => {
    let velocity = vx < 0 ? clamp(Math.abs(vx), 5, 7) * -1 : clamp(vx, 5, 7);
    if (Math.abs(dx) > MaxDistance) {
      this._setCardDecay(velocity, vy);
    } else {
      this._setCardSpring();
    }
  };

  _dynamicTiming = (toValue, duration) => {
    Animated.timing(this.opacity, {
      toValue,
      duration,
    });
  };

  _dynamicSpring = (toValue, duration) => {
    Animated.spring(this.nextItem, {
      toValue,
      duration,
    });
  };

  _resetCats = () => {
    this.setState(
      state => ({
        cats: state.cats.slice(1),
      }),
      () => {
        this.nextItem.setValue(0.9);
        this.opacity.setValue(1);
        this.cardAnimation.setValue({ x: 0, y: 0 });
      },
    );
  };

  _handleNextTransition = () => {
    Animated.parallel([this._dynamicTiming(0, 300), this._dynamicSpring(0, 300)]).start(
      this._resetCats,
    );
  };

  render() {
    const { cats } = this.state;
    const rotate = this.cardAnimation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-45deg', '0deg', '45deg'],
      extrapolate: 'clamp',
    });

    const opacity = this.cardAnimation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <View style={[container]}>
        <View style={wrap}>
          {cats
            .slice(0, 2)
            .reverse()
            .map(({ id, image, desc }, index, items) => {
              const isLastItem = index === items.length - 1; // false
              const isSecondToLast = index === items.length - 2; // true

              const panHandlers = isLastItem ? this._panResponder.panHandlers : {};
              const opacityImage = isLastItem ? { opacity } : undefined;
              const cardAnimationStyles = isLastItem
                ? {
                    transform: [{ rotate }, ...this.cardAnimation.getTranslateTransform()],
                    opacity: this.opacity,
                  }
                : undefined;
              const nextStyle = isSecondToLast
                ? { transform: [{ scale: this.nextItem }] }
                : undefined;

              return (
                <Animated.View
                  {...panHandlers}
                  style={[cardContainer, cardAnimationStyles, nextStyle]}
                  key={id}
                >
                  <Animated.Image
                    resizeMode="cover"
                    source={image}
                    style={[cardImage, opacityImage]}
                  />
                  <Text style={cardText}>{desc}</Text>
                </Animated.View>
              );
            })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: 400,
    width: 300,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  cardImage: {
    height: null,
    width: null,
    flex: 4,
  },
  cardText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    textAlignVertical: 'center',
  },
});

const { container, wrap, cardImage, cardText, cardContainer } = styles;
