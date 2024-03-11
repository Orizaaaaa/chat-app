
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home/HomeScreen';
import LoginScreen from './screens/login/LoginScreen';
import SignUpScreen from './screens/signup/SignUpScreen';
import { Provider } from 'react-redux';
import Store from './redux/store';
import SplashScreen from './screens/splash/SplashScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={Store} >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignUpScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}