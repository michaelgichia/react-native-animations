import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import {
  OpacityAnimations,
  TransformAnimations,
  ScaleAnimations,
  WidthHeightAnimations,
  AbsolutePosition,
  WidthHeightInterpolation,
  RotationAnimation,
} from './TimingAnimations';
import SpringAnimation from './SpringAnimation';
import LoopAnimation from './LoopAnimation';
import Event from './Event';
import PanResponderAnimation from './PanResponderAnimation';
import StaggerHeads from './StaggerHeads';
import SequenceAnimation from './Sequence';
import KittenCards from './KittenCards';
import FabBtn from './FabBtn';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));

storiesOf('Timing animations', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('animating opacity', () => <OpacityAnimations />)
  .add('animating translateY', () => <TransformAnimations />)
  .add('animating scale', () => <ScaleAnimations />)
  .add('animating width and height', () => <WidthHeightAnimations />)
  .add('animating top, right, bottom and left', () => <AbsolutePosition />)
  .add('interpolating width and height', () => <WidthHeightInterpolation />)
  .add('rotation animation', () => <RotationAnimation />);

storiesOf('Spring animations', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with scale', () => <SpringAnimation />);

storiesOf('Loop animations', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with rotation', () => <LoopAnimation />);

storiesOf('Events animations', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with background-color', () => <Event />);

storiesOf('Pan Responder animations', module).add('with background-color', () => (
  <PanResponderAnimation />
));

storiesOf('Stagger heads animations', module).add('with background-color', () => <StaggerHeads />);

storiesOf('Sequence animations', module).add('with background-color', () => <SequenceAnimation />);

storiesOf('Animating cat images', module).add('with pan responder', () => <KittenCards />);

storiesOf('Floating action btn', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => <FabBtn />);
