import React, { useContext, useState } from "react";
import {
  Button,
  Share,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import { ThemeContext } from "../Context/Theme";

const ScanResult = ({ result, close }) => {
  const Theme = useContext(ThemeContext);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(result);
  };

  const handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(result);
  };

  const ShareToSocial = async (res) => {
    try {
      const result = await Share.share({
        message: res,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert("Error sharing", error.message);
    }
  };

  return (
    <Modal isVisible={result.length > 0 ? true : false}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: 120,
            width: "94%",
            backgroundColor: Theme.dark ? "#000" : "#fff",
            borderRadius: 10,
            position: "relative",
            borderWidth: Theme.dark ? 1 : null,
            borderColor: Theme.dark ? "grey" : null,
            overflow: "visible", // Allow content to overflow its container
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "800",
                color: Theme.dark ? "#fff" : "#000",
              }}
            >
              Result
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                marginTop: 3,
                borderBottomWidth: 1,
                color: Theme.dark ? "#fff" : "#000",
              }}
            >
              {result}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "70%",
              alignSelf: "center",
              justifyContent: "space-around",
              padding: 8,
            }}
          >
            <TouchableOpacity onPress={handlePressButtonAsync}>
              <Image  style={{ height: 50, width: 50 }} source={require("../../assets/google.png")} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ShareToSocial(result)}>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../../assets/share.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={copyToClipboard}>
              <Image
                style={{ height: 50, width: 50 }}
                source={require("../../assets/copy.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ position: "absolute", right: -10, top: -10 }}>
            <TouchableOpacity onPress={() => close()}>
              <Image source={require("../../assets/cut.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ScanResult;
