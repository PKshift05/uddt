import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './src/screens/store';
import ListTicket from './src/screens/listTicket';
import SettingAccount from './src/screens/SettingAccount';
import SettingApp from './src/screens/SettingApp';
import SettingOffer from './src/screens/SettingOffer';
import SettingAbout from './src/screens/SettingAbout';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  
      <Provider store={store}>

        <PaperProvider >
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'default' }} />            
            <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
          options={{ animation: 'slide_from_right' }} /> */}
              <Stack.Screen name="Tab" component={TabNavigator} options={{ animation: 'default' }} />
              <Stack.Screen
                name="ListTicket"
                component={ListTicket}
                options={{ animation: 'default' }} />

              <Stack.Screen
                name="MovieDetails"
                component={MovieDetailScreen}
                options={{ animation: 'slide_from_right' }} />
              <Stack.Screen
                name="SeatBooking"
                component={SeatBookingScreen}
                options={{ animation: 'slide_from_bottom' }} />
              <Stack.Screen
                name="SettingAccount"
                component={SettingAccount}
                options={{ animation: 'default' }} />
              <Stack.Screen
                name="SettingApp"
                component={SettingApp}
                options={{ animation: 'default' }} />
              <Stack.Screen
                name="SettingOffer"
                component={SettingOffer}
                options={{ animation: 'default' }} />
              <Stack.Screen
                name="SettingAbout"
                component={SettingAbout}
                options={{ animation: 'default' }} />

            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    
  );
}


