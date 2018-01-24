import React, { PureComponent } from 'react';
import { ScrollView, Animated, StyleSheet, View } from 'react-native';

export default class Event extends PureComponent {
  colorAnimations = new Animated.Value(0);

  render() {
    const bgColorInterpolation = {
      backgroundColor: this.colorAnimations.interpolate({
        inputRange: [0, 3000],
        outputRange: ['salmon', 'cyan'],
      }),
    };
    return (
      <View style={wrapper}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.colorAnimations,
                },
              },
            },
          ])}
        >
          <Animated.View style={[container, bgColorInterpolation]} />
        </ScrollView>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    height: 3000,
    width: '100%',
  },
});

export const { wrapper, container } = styles;
