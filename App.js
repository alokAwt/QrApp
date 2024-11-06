import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./Src/Navigation/Onboarding";
import BottomTab from "./Src/Navigation/BottomTab";
import { AuthContext, Authprovider, Themeprovider } from "./Src/Context/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckLoginStatus = () => {
  const { login, setLogin } = useContext(AuthContext);

  useEffect(() => {
    const GetLoginStatus = async () => {
      try {
        let login = await AsyncStorage.getItem("login");

        if (login !== null) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    GetLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Onboarding />
    </NavigationContainer>
  );
};

function App() {
  return (
    <Authprovider>
      <Themeprovider>
        <CheckLoginStatus />
      </Themeprovider>
    </Authprovider>
  );
}

export default App;
