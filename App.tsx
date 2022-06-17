import { StatusBar } from 'expo-status-bar'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ResetPassword from './screens/ResetPassword';
import Note from './screens/Note';
import ManageAccount from './screens/ManageAccount';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name = "SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name = "ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name = "Note" component={Note} options={{headerShown: false}}/>
        <Stack.Screen name = "ManageAccount" component={ManageAccount} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}