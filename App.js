import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FirstScreen from './screens/FirstScreen';
import RegisterScreen from './screens/RegisterScreen';
import TabScreen from './navigation/tab';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DeliveryScreen from './screens/DeliveryScreen';
import PickupScreen from './screens/PickupScreen';
import DetailScreen from './screens/DetailScreen';
import { CartProvider } from './context/CartContext';
import Cart from './screens/Cart';
import { CartIcon } from './components/CartIcon';
import MenuScreen from './screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "tr-bold": require("./assets/fonts/triomphe-bold-autoinstr.ttf"),
    "tr-light": require("./assets/fonts/triomphe-light-autoinstr.ttf"),
    "tr-regular": require("./assets/fonts/triomphe-regular-autoinstr.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="First" component={FirstScreen} />
          <Stack.Screen options={{
            headerShown: true, headerTitleStyle: { fontFamily: 'tr-regular' }, headerStyle: {
              padding: 100
            },
          }}
            name="Login" component={LoginScreen} />
          <Stack.Screen options={{
            headerShown: true, headerTitleStyle: { fontFamily: 'tr-regular' }, headerStyle: {
              padding: 100
            },
          }}
            name="Register" component={RegisterScreen} />

          <Stack.Screen options={{ headerShown: false }} name="Home" component={BottomTabScreen} />
          <Stack.Screen options={{
            headerShown: true, headerTitleStyle: { fontFamily: 'tr-regular' }, headerStyle: {
              padding: 100
            },
          }}
            name="Delivery" component={DeliveryScreen} />
          <Stack.Screen options={{
            headerShown: true, headerTitleStyle: { fontFamily: 'tr-regular' }, headerStyle: {
              padding: 100
            },
          }}
            name="Pickup" component={PickupScreen} />
          <Stack.Screen name='Menu' component={MenuScreen}
            options={({ navigation }) => ({
              title: 'Products',
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <CartIcon navigation={navigation} />
            })} />
          <Stack.Screen options={{ headerShown: false }} name='Detail' component={DetailScreen} />
          <Stack.Screen name='Cart' component={Cart}
            options={({ navigation }) => ({
              title: 'My cart',
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <CartIcon navigation={navigation} />,
            })} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

function BottomTabScreen() {
  return (
    <TabScreen />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});