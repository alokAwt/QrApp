import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SignUpUsers } from "../Api/Api";

const Signup = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Number, setNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSignUp = async () => {
    if (!Email) {
      Alert.alert("Email is required");
      return false;
    } else if (!Number) {
      Alert.alert("Number is required");
      return false;
    } else if (!Email) {
      Alert.alert("Email is required");
      return false;
    } else if (!Password) {
      Alert.alert("Password is required");
      return false;
    }
    setLoading(true);

    SignUpUsers({
      Name: Name,
      Email: Email,
      ContactNumber: Number,
      Password: Password,
    }).then(async (res) => {
      console.log(res);
      if (res.status === "failed") {
        Alert.alert(res.message);
        setLoading(false);
      } else if (res.message === "success") {
        navigation.navigate("Login");
        setLoading(false);
      } else {
        Alert.alert("Failed to login");
        setLoading(false);
      }
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/logosmall.png")}
        ></Image>

        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Create your Account</Text>
          <TextInput
            value={Name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Name"
          ></TextInput>
          <TextInput
            value={Number}
            onChangeText={(text) => setNumber(text)}
            style={styles.input}
            placeholder="Number"
          ></TextInput>
          <TextInput
            value={Email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Email"
          ></TextInput>
          <TextInput
            value={Password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Password"
          ></TextInput>
          <TouchableOpacity style={styles.signInButton} onPress={HandleSignUp}>
            <View style={styles.buttonContent}>
              {loading ? (
                <ActivityIndicator size={36} color={"red"}></ActivityIndicator>
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <Text style={styles.orSignInWith}>Or Sign Up with</Text>
          <View style={styles.socialLoginContainer}>
            <View style={styles.socialLoginButton}>
              <Image
                style={{
                  alignSelf: "center",
                }}
                source={require("../../assets/google.png")}
              ></Image>
            </View>
            <View style={styles.socialLoginButton}>
              <View style={styles.signUpTextContainer}>
                <Image
                  style={{
                    alignSelf: "center",
                  }}
                  source={require("../../assets/facebook.png")}
                ></Image>
              </View>
            </View>
            <View style={styles.socialLoginButton}>
              <View style={styles.signUpTextContainer}>
                <Image
                  style={{
                    alignSelf: "center",
                  }}
                  source={require("../../assets/apple.png")}
                ></Image>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.signUpTextContainer, { padding: 20 }]}>
          <Text style={styles.signUpText}>Already have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: "center",
    marginTop: 60,
  },
  inputContainer: {
    marginTop: 35,
    width: "100%",
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    height: 58,
    marginTop: 15,
    borderRadius: 8,
    paddingLeft: 15,
    fontWeight: "600",
    fontSize: 16,
    borderColor: "rgba(188, 188, 188, 1)",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 113, 67, 1)",
    borderRadius: 8,
    marginTop: 30,
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  divider: {
    width: "96%",
    height: 2,
    backgroundColor: "rgba(174, 174, 174, 1)",
    marginTop: 20,
    alignSelf: "center",
  },
  orSignInWith: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(137, 137, 137, 1)",
  },
  socialLoginContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialLoginButton: {
    width: 100,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(188, 188, 188, 1)",
    elevation: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  socialLoginIcon: {
    alignSelf: "center",
  },
  signUpTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontWeight: "600",
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 113, 67, 1)",
  },
});

export default Signup;
