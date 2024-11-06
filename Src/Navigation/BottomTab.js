import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Pages/Home";
import Favroties from "../Pages/Favroties";
import History from "../Pages/History";
import Settings from "../Pages/Setting";
import { Image } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../Context/Theme";

const Tab = createBottomTabNavigator();

function BottomTab() {
  const Theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
    initialRouteName="Scan"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          height: 65,
          backgroundColor: Theme.dark ? "#000" : "rgba(255, 113, 67, 1)",
        },
        tabBarLabelStyle: {
          marginBottom: 15,
          display: "none",
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="Scan"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                style={{
                  height: 43,
                  width: 35,
                  tintColor: Theme.dark ? "rgba(255, 113, 67, 1)" : null,
                }}
                source={require("../../assets/scanA.png")}
              ></Image>
            ) : (
              <Image
                style={{ height: 43, width: 35, tintColor: "grey" }}
                source={require("../../assets/scanA.png")}
              ></Image>
            ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                style={{
                  height: 45,
                  width: 60,
                  tintColor: Theme.dark ? "rgba(255, 113, 67, 1)" : null,
                }}
                source={require("../../assets/favA.png")}
              ></Image>
            ) : (
              <Image
                style={{ height: 45, width: 60, tintColor: "grey" }}
                source={require("../../assets/favA.png")}
              ></Image>
            ),
        }}
        component={Favroties}
      />
      <Tab.Screen
        name="History"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                style={{
                  height: 45,
                  width: 42,
                  tintColor: Theme.dark ? "rgba(255, 113, 67, 1)" : null,
                }}
                source={require("../../assets/historyA.png")}
              ></Image>
            ) : (
              <Image
                style={{ height: 45, width: 42, tintColor: "grey" }}
                source={require("../../assets/historyA.png")}
              ></Image>
            ),
        }}
        component={History}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                style={{
                  height: 48,
                  width: 52,
                  marginTop: -1,
                  tintColor: Theme.dark ? "rgba(255, 113, 67, 1)" : null,
                }}
                source={require("../../assets/settingA.png")}
              ></Image>
            ) : (
              <Image
                style={{
                  height: 48,
                  width: 52,
                  tintColor: "grey",
                  marginTop: -1,
                }}
                source={require("../../assets/settingA.png")}
              ></Image>
            ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
