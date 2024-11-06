import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, ThemeContext } from "../Context/Theme";

const Settings = ({ navigation }) => {
  const [dark, setDark] = useState(false);
  const Theme = useContext(ThemeContext);
  const { login, setLogin } = useContext(AuthContext);
  const handleDarkMode = async (text) => {
    setDark(text);
    if (text) {
      Theme.setDark(true);
    } else {
      Theme.setDark(false);
    }
  };

  const HandleLogout = async () => {
    await AsyncStorage.removeItem("login");
    setLogin(false);
  };
  return (
    <ScrollView>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Theme.dark ? "#000" : null }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600",
            marginTop: 20,
            color: Theme.dark ? "#fff" : "#000",
          }}
        >
          Setting
        </Text>
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgba(255, 113, 67, 1)",
                fontWeight: "600",
              }}
            >
              General
            </Text>
          </View>

          <View
            style={{
              width: "80%",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                style={{ tintColor: Theme.dark ? "#fff" : null }}
                source={require("../../assets/bell.png")}
              ></Image>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 17,
                  fontWeight: "500",
                  marginTop: -5,
                  color: Theme.dark ? "#fff" : "#000",
                }}
              >
                Notification
              </Text>
            </View>

            <Image source={require("../../assets/next.png")}></Image>
          </View>
          <Text
            style={{
              width: "79%",
              height: 1,
              backgroundColor: "grey",
              alignSelf: "center",
              marginTop: 8,
            }}
          ></Text>

          <View
            style={{
              width: "80%",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                style={{ tintColor: Theme.dark ? "#fff" : null }}
                source={require("../../assets/lang.png")}
              ></Image>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 17,
                  fontWeight: "500",
                  marginTop: -5,
                  color: Theme.dark ? "#fff" : "#000",
                }}
              >
                App Language
              </Text>
            </View>

            <Image source={require("../../assets/next.png")}></Image>
          </View>
          <Text
            style={{
              width: "79%",
              height: 1,
              backgroundColor: "grey",
              alignSelf: "center",
              marginTop: 8,
            }}
          ></Text>

          <View
            style={{
              width: "80%",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                style={{ tintColor: Theme.dark ? "#fff" : null }}
                source={require("../../assets/help.png")}
              ></Image>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 17,
                  fontWeight: "500",
                  marginTop: -5,
                  color: Theme.dark ? "#fff" : "#000",
                }}
              >
                Help & Support
              </Text>
            </View>

            <Image source={require("../../assets/next.png")}></Image>
          </View>
          <Text
            style={{
              width: "79%",
              height: 1,
              backgroundColor: "grey",
              alignSelf: "center",
              marginTop: 8,
            }}
          ></Text>
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgba(255, 113, 67, 1)",
                fontWeight: "600",
              }}
            >
              Visual
            </Text>
          </View>

          <View
            style={{
              width: "80%",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image source={require("../../assets/dark.png")}></Image>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 17,
                  fontWeight: "500",
                  marginTop: -5,
                  color: Theme.dark ? "#fff" : "#000",
                }}
              >
                Dark Mode
              </Text>
            </View>

            <Checkbox
              style={{ borderRadius: 5 }}
              value={dark === true ? true : false}
              onValueChange={(text) => handleDarkMode(true)}
              color={dark ? "rgba(255, 113, 67, 1)" : undefined}
            />
          </View>
          <Text
            style={{
              width: "79%",
              height: 1,
              backgroundColor: "grey",
              alignSelf: "center",
              marginTop: 8,
            }}
          ></Text>

          <View
            style={{
              width: "80%",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image source={require("../../assets/light.png")}></Image>
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 17,
                  fontWeight: "500",
                  marginTop: -5,
                  color: Theme.dark ? "#fff" : "#000",
                }}
              >
                Light Mode
              </Text>
            </View>

            <Checkbox
              style={{ borderRadius: 5 }}
              value={dark === true ? false : true}
              onValueChange={(text) => handleDarkMode(false)}
              color={dark === false ? "rgba(255, 113, 67, 1)" : undefined}
            />
          </View>
          <Text
            style={{
              width: "79%",
              height: 1,
              backgroundColor: "grey",
              alignSelf: "center",
              marginTop: 8,
            }}
          ></Text>

          <View
            style={{
              width: "100%",
              marginTop: 30,
            }}
          >
            <View
              style={{
                width: "80%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(255, 113, 67, 1)",
                  fontWeight: "600",
                }}
              >
                Scanner
              </Text>
            </View>

            <View
              style={{
                width: "80%",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ tintColor: Theme.dark ? "#fff" : null }}
                  source={require("../../assets/vib.png")}
                ></Image>
                <Text
                  style={{
                    marginLeft: 30,
                    fontSize: 17,
                    fontWeight: "500",
                    marginTop: -5,
                    color: Theme.dark ? "#fff" : "#000",
                  }}
                >
                  Vibration
                </Text>
              </View>

              <Checkbox style={{ borderRadius: 5 }} value={false} />
            </View>
            <Text
              style={{
                width: "79%",
                height: 1,
                backgroundColor: "grey",
                alignSelf: "center",
                marginTop: 8,
              }}
            ></Text>

            <View
              style={{
                width: "80%",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ tintColor: Theme.dark ? "#fff" : null }}
                  source={require("../../assets/sound.png")}
                ></Image>
                <Text
                  style={{
                    marginLeft: 30,
                    fontSize: 17,
                    fontWeight: "500",
                    marginTop: -5,
                    color: Theme.dark ? "#fff" : "#000",
                  }}
                >
                  Sound
                </Text>
              </View>

              <Checkbox style={{ borderRadius: 5 }} value={false} />
            </View>

            <Text
              style={{
                width: "79%",
                height: 1,
                backgroundColor: "grey",
                alignSelf: "center",
                marginTop: 8,
              }}
            ></Text>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 30,
            }}
          >
            <View
              style={{
                width: "80%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(255, 113, 67, 1)",
                  fontWeight: "600",
                }}
              >
                Feedback
              </Text>
            </View>

            <View
              style={{
                width: "80%",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ tintColor: Theme.dark ? "#fff" : null }}
                  source={require("../../assets/fead.png")}
                ></Image>
                <Text
                  style={{
                    marginLeft: 30,
                    fontSize: 17,
                    fontWeight: "500",
                    marginTop: -5,
                    color: Theme.dark ? "#fff" : "#000",
                  }}
                >
                  Send Feedback
                </Text>
              </View>

              <Image source={require("../../assets/next.png")}></Image>
            </View>
            <Text
              style={{
                width: "79%",
                height: 1,
                backgroundColor: "grey",
                alignSelf: "center",
                marginTop: 8,
              }}
            ></Text>
            {login ? (
              <TouchableOpacity onPress={HandleLogout}>
                <View
                  style={{
                    width: "80%",
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      style={{
                        tintColor: Theme.dark ? "#fff" : null,
                        height: 30,
                        width: 30,
                      }}
                      source={require("../../assets/logout.png")}
                    ></Image>
                    <Text
                      style={{
                        marginLeft: 30,
                        fontSize: 17,
                        fontWeight: "500",
                        marginTop: -5,
                        color: Theme.dark ? "#fff" : "#000",
                      }}
                    >
                      Logout
                    </Text>
                  </View>

                  <Image source={require("../../assets/next.png")}></Image>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Settings;
