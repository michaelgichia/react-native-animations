## :fire: To run this project

1. Clone this repository `git clone https://github.com/michaelgichia/react_native_animations.git` and cd the project.
2. Install dependancies either by running npm install or yarn.
3. Run storybook on the first terminal `yarn run storybook` or `npm run storybook`. You can navigate all the pages on `localhost:7007/` and will sync with the app.
4. If you have all prerequisites setup, open the second terminal and run the android project `react-native run-android`.
5. Depending on your setup, after the build, the application will be open.

## Troubleshoot
1. Open debug menu on devices `adb shell input keyevent 82`
2. ERROR Metro Bundler can't listen on port <PORT> try `sudo lsof -i :<PORT>` and `kill -9 <PID>`