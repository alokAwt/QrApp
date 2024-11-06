import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Scanner");
    }, 3000);
  }, []);
  return (
    <View style={Styles.Head}>
      <View style={Styles.container}>
        <Image source={require("../../assets/qrlogo.png")}></Image>
      </View>
      <Text style={Styles.BottomText}>
        Powered By <Text style={Styles.half}>QR Angadi</Text>
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  Head: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  BottomText: {
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    fontWeight: "600",
    fontSize: 18,
    color: "black",
  },
  half: {
    fontWeight: "800",
    fontSize: 18,
    color: "rgba(255, 113, 67, 1)",
  },
});

export default Splash;
