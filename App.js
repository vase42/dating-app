import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RegisterScreen from "./components/RegisterScreen";
import ProfileSetupScreen from "./components/ProfileSetupScreen";
import FeedScreen from "./components/FeedScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="RegisterScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="FeedScreen" component={FeedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
