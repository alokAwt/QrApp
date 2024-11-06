import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import ScanResult from "../Components/ScanResult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../Context/Theme";

export default function Home() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState("");
  const [scanning, setScanning] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [scandata, setSacndata] = useState([
    { url: "", liked: false, time: new Date() },
  ]);
  const [load, setLoad] = useState(false);

  const Theme = useContext(ThemeContext);

  useEffect(() => {
    if (scanning) {
      setResult("");
    }
  }, [scanning]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === "granted");
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ marginTop: 80 }}>
        <ImageBackground
          style={{ width: 220, height: 220, alignSelf: "center" }}
          source={require("../../assets/per1.png")}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={require("../../assets/per2.png")}></Image>
          </View>
        </ImageBackground>
        <Text
          style={{
            fontSize: 17,
            color: Theme.dark ? "#fff" : "#000",
            fontWeight: "700",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Allow QR Angadi to access Camera?
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
          We need your permission to access your
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
          camera to use QR Angadi App.
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
          onPress={requestPermission}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
              Allow Permission
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasGalleryPermission === false) {
    return <Text>No access to internal storage</Text>;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function handleScanResult(data) {
    const scan = {
      data: data.data,
      liked: false,
      time: new Date(),
    };

    if (scanning) {
      setResult(data.data);
      setScanning(false);

      try {
        const storedData = await AsyncStorage.getItem("Scan");
        let scandata = storedData ? JSON.parse(storedData) : [];
        scandata = [scan, ...scandata];
        if (scandata.length > 10) {
          scandata = scandata.slice(0, 10);
        }

        // Update the state with the new scandata array
        setSacndata(scandata);

        // Store the updated scandata in AsyncStorage
        await AsyncStorage.setItem("Scan", JSON.stringify(scandata));
      } catch (error) {
        console.error("Error handling scan data", error);
      }
    }
  }

  const handleFlashOn = async () => {
    setFlashOn((current) => !current);
    const allRows = await db.getAllAsync("SELECT * FROM scanned_data");
    console.log("All Rows:", allRows);
  };

  const closeModal = () => {
    setResult("");
    setScanning(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    handle(result.assets[0].uri);
  };

  async function handle(e) {
    setLoad(true);
    const data = new FormData();
    data.append("file", {
      uri: e,
      type: "image/jpeg",
      name: "image.jpg",
    });
    data.append("upload_preset", "vsqmoxq9");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxlmwq61j/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const file = await res.json();
    if (file?.secure_url) {
      let data = await fetch(`https://sanner.vercel.app/decodeQR`, {
        method: "post",
        body: JSON.stringify({
          image: file.secure_url,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      if (data?.error) {
        setLoad(false);
        Alert.alert("Failed to Decode.. Please try again");
      } else {
        setLoad(false);
        setResult(data?.decodedValue);
      }
    } else {
      setLoad(false);
      Alert.alert("Failed to Decode.. Please try again");
    }
  }

  if (load) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: "#fff",
            elevation: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={"orange"} size={32}></ActivityIndicator>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScanResult result={result} close={closeModal}></ScanResult>
      <View
        style={{
          width: "100%",
          height: 130,
          backgroundColor: Theme.dark ? "#000" : "#fff",
        }}
      >
        <View
          style={{
            width: "98%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 60,
            alignSelf: "center",
          }}
        >
          <Image
            style={{ marginTop: 5, tintColor: Theme.dark ? "#fff" : null }}
            source={require("../../assets/icontop.png")}
          ></Image>
          {Theme.dark ? (
            <Image source={require("../../assets/darklogo.png")}></Image>
          ) : (
            <Image source={require("../../assets/logohome.png")}></Image>
          )}

          <Image
            style={{ tintColor: Theme.dark ? "#fff" : null }}
            source={require("../../assets/profile.png")}
          ></Image>
        </View>
      </View>
      <CameraView
        style={styles.camera}
        facing={facing}
        enableTorch={flashOn}
        CameraMode={"picture"}
        onBarcodeScanned={handleScanResult}
      >
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#fff",
            height: 40,
            marginTop: 20,
            borderRadius: 10,
            elevation: 2,
            backgroundColor: "#000",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 14 }}>
              Welcome to QR Angadi
            </Text>
          </View>
        </View>
        <View style={styles.overlayContainer}>
          <View style={styles.circularBorder}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Image source={require("../../assets/image.png")}></Image>
            </TouchableOpacity>
            {flashOn ? (
              <TouchableOpacity style={styles.button} onPress={handleFlashOn}>
                <Image
                  style={{ height: 55, width: 55 }}
                  source={require("../../assets/flashopen.png")}
                ></Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleFlashOn}>
                <Image source={require("../../assets/flash.png")}></Image>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Image
                style={{ height: 55, width: 55 }}
                source={require("../../assets/flip.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circularBorder: {
    width: 250,
    height: 250,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "75%",
    alignSelf: "center",
    justifyContent: "space-around",
    padding: 20,
    marginTop: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
