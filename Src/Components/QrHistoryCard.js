import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "../Context/Theme";
import ScanResult from "./ScanResult";

const QrHistoryCard = ({ data, handleClick }) => {
  const [modeldata, setModalData] = useState("");
  const theme = useContext(ThemeContext);
  const getFormattedDate = (date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const suffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${suffix(
      day
    )} - ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const HandleModel = (data) => {
    setModalData(data);
  };

  const CloseModel = () => {
    setModalData("");
  };

  return (
    <View style={{ marginTop: 16 }}>
      <ScanResult result={modeldata} close={CloseModel}></ScanResult>
      {data?.length === 0 ? (
        <Text
          style={{
            marginLeft: 50,
            fontSize: 20,
            fontWeight: "bold",
            color: theme.dark ? "#fff" : null,
          }}
        >
          No Any Qr Scan
        </Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>HandleModel(item.data)}>
              <View
                style={{
                  width: "85%",
                  height: 70,
                  backgroundColor: theme.dark ? "#000" : "#fff",
                  alignSelf: "center",
                  borderRadius: 8,
                  marginTop: 20,
                  borderWidth: theme.dark ? 1 : null,
                  borderColor: theme.dark ? "grey" : null,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "30%" }}>
                    <Text
                      style={{
                        marginLeft: 15,
                        marginTop: 2,
                        fontSize: 14,
                        color: "rgba(255, 113, 67, 1)",
                        fontWeight: "700",
                      }}
                    >
                      Website
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "70%",
                      height: 23,
                      backgroundColor: theme.dark
                        ? "grey"
                        : "rgb(246, 245, 242)",
                      background: "transparent",
                      elevation: 1,
                      borderBottomLeftRadius: 22,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "right",
                        marginRight: 6,
                        fontSize: 12,
                        fontWeight: "500",
                        color: "rgba(74, 74, 74, 1)",
                      }}
                    >
                      {getFormattedDate(new Date(item.time))}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    alignSelf: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: theme.dark ? "#fff" : "rgba(0, 0, 0, 1)",
                      }}
                    >
                      {item.data.slice(0, 25)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleClick(index)}>
                    <View>
                      <Image
                        style={{ tintColor: item.liked ? "red" : null }}
                        source={require("../../assets/heart.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default QrHistoryCard;
