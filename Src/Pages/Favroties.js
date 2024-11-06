import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ImageBackground,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QrHistoryCard from "../Components/QrHistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext, ThemeContext } from "../Context/Theme";

const Favroties = ({navigation}) => {
  const [datalist, setData] = useState([]);
  const theme = useContext(ThemeContext);
  const { login, setLogin } = useContext(AuthContext);
  useEffect(() => {
    GetData();
  }, []);

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

  useFocusEffect(
    useCallback(() => {
      GetData();
    }, [])
  );

  const GetData = async () => {
    try {
      const db = await AsyncStorage.getItem("Scan");
      if (db) {
        const parsedData = JSON.parse(db);
        setData(parsedData.filter((data) => data.liked === true));
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error getting data from AsyncStorage", error);
      setData([]);
    }
  };

  const handleHeartClick = async (index) => {
    const updatedData = [...datalist];
    updatedData[index].liked = !updatedData[index].liked;

    setData(updatedData);

    try {
      await AsyncStorage.setItem("Scan", JSON.stringify(updatedData));
      GetData();
    } catch (error) {
      console.error("Error updating data in AsyncStorage", error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.dark ? "#000" : null }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              width: "20%",
            }}
          >
            <Image
              source={require("../../assets/noti.png")}
              style={[styles.icon, { tintColor: theme.dark ? "#fff" : null }]}
            />
          </View>

          <Text
            style={[styles.headerText, { color: theme.dark ? "#fff" : null }]}
          >
            My Favorites
          </Text>
        </View>
       {login ? (
           <QrHistoryCard
           data={datalist}
           handleClick={handleHeartClick}
         ></QrHistoryCard>
        ) : (
          <View style={{ marginTop: 40 }}>
            <ImageBackground
              style={{ width: 220, height: 220, alignSelf: "center" }}
              source={require("../../assets/per1.png")}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={require("../../assets/per2.png")}></Image>
              </View>
            </ImageBackground>
            <Text
              style={{
                fontSize: 17,
                color:theme.dark? "#fff":"#000",
                fontWeight: "700",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Login to Qr Angadi to access History?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "rgba(151, 151, 151, 1)",
                fontWeight: "600",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              To access these features, login is required.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "rgba(151, 151, 151, 1)",
                fontWeight: "600",
                textAlign: "center",
                marginTop: 0,
              }}
            >
              Please log in to use the QR Angadi App.
            </Text>

            <TouchableOpacity
              style={{
                width: "70%",
                height: 40,
                backgroundColor: "rgba(255, 113, 67, 1)",
                alignSelf: "center",
                borderRadius: 8,
                marginTop: 40,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
    alignSelf: "center",
  },
  icon: {
    marginTop: 2,
    marginLeft: 20,
    alignSelf: "center",
  },
  headerText: {
    width: "80%",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 60,
  },
});

export default Favroties;
