import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Scheduler from "./Screens/Scheduler";
import EventHolder from "./Screens/EventHolder";
import SignIn from "./Screens/SignIn";
import Map from "./Screens/Map";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Scheduler"
          component={Scheduler}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EventHolder"
          component={EventHolder}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Map"
          component={Map}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
