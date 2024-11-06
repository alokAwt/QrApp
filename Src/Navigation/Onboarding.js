import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../Pages/Splash";
import Signup from "../Pages/SignUp";
import Login from "../Pages/Login";
import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator();

const Onboarding = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="Scanner" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default Onboarding;
