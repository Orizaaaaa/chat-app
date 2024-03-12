
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home/HomeScreen';
import LoginScreen from './screens/login/LoginScreen';
import SignUpScreen from './screens/signup/SignUpScreen';
import SplashScreen from './screens/splash/SplashScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import AddToChatScreen from './screens/addChatScreen/AddToChatScreen';
import ChatScreen from './screens/chatScreen/ChatScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignUpScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="addToChat" component={AddToChatScreen} />
          <Stack.Screen name="chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}