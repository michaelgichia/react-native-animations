import React, { PureComponent } from 'react';
import { Animated, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default class NotificationSystem extends PureComponent {
  state = {
    value: '',
    notification: '',
    opacity: new Animated.Value(0),
    offset: new Animated.Value(0),
  };

  _handlePress = notification => {
    this.setState({
      value: '',
      notification,
    });
  };

  _handlePress = notification => {
    this.setState(
      {
        value: '',
        notification,
      },
      () => {
        this._notification.getNode().measure((x, y, width, height, pageX, pageY) => {
          this.state.offset.setValue(height * -1);

          Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 300,
              }),
              Animated.timing(this.state.offset, {
                toValue: 0,
                duration: 300,
              }),
            ]),

            Animated.delay(1500),

            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 300,
              }),
              Animated.timing(this.state.offset, {
                toValue: height * -1,
                duration: 300,
              }),
            ]),
          ]).start();
        });
      },
    );
  };

  render() {
    const { value, notification, opacity, offset } = this.state;
    //console.warn({ notification });
    const notificationOpacity = {
      opacity,
      transform: [
        {
          translateY: offset,
        },
      ],
    };

    return (
      <View style={container} key="janeaa">
        <Animated.View
          style={[notificationStyles, notificationOpacity]}
          ref={ele => (this._notification = ele)}
        >
          <Text style={notificationText}>{notification}</Text>
        </Animated.View>
        <View>
          <TextInput
            style={input}
            value={value}
            onChangeText={newvalue => this.setState({ value: newvalue })}
          />
          <TouchableOpacity onPress={() => this._handlePress(value)}>
            <View style={button}>
              <Text style={buttonText}>Show Notification</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'salmon',
    padding: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
  },
  notificationStyles: {
    position: 'absolute',
    paddingHorizontal: 7,
    paddingVertical: 15,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: 'salmon',
  },
  notificationText: {
    color: '#ffffff',
  },
});

const {
  container,
  input,
  button,
  buttonText,
  notification,
  notificationText,
  notificationStyles,
} = styles;
