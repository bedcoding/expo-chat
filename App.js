// Import the screens
import Main from './components/Main';
import Chat from './components/Chat';

// Import React Navigation
import { createStackNavigator } from 'react-navigation-stack'

// 오류 뜨길래 구글링해서 추가함
import { createAppContainer } from 'react-navigation';

// Create the navigator
const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
});

// 에러 떠서 구글링해서 추가함
const App = createAppContainer(navigator)

// Export it as the root component
export default App


// 설치한 파일 목록
// npm install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens
// npm i react-native-gifted-chat
// react-navigation-stack
// npm install firebase

// 파이어베이스 세팅
// https://console.firebase.google.com/
// 데이터베이스 -> 실시간 데이터베이스 -> 규칙 -> ".read": true, ".write": true