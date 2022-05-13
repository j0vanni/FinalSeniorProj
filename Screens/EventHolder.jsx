import React, { useEffect, useReducer } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import {
  query,
  where,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import storedinfo from "../storedinfo";
const APIKEY = "AIzaSyAOkb1qfug4ZbKWWsJC7393qBL7N6RKq9w";

const EventView = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#93B7BE",
        width: "90%",
        height: 140,
        left: 20,
        borderRadius: 10,
        marginBottom: 10,
      }}
      onPress={() =>
        navigation.navigate("Map", {
          plotline: props.plotline,
          number: props.num,
        })
      }
    >
      <Text
        style={[
          styles.textColor,
          {
            textAlign: "center",
            top: 5,
            borderBottomWidth: 1,
            fontWeight: "bold",
          },
        ]}
      >
        {props.title}
      </Text>
      <Text style={[styles.textColor, { top: 5, left: 5 }]}>
        Origin:{" "}
        {String(props.origin).substring(0, String(props.origin).length - 15)}
      </Text>
      <Text style={[styles.textColor, { top: 7, left: 220 }]}>
        {props.duration}
      </Text>
      <Text style={[styles.textColor, { top: 10, left: 5 }]}>
        Destination:{" "}
        {String(props.destination).substring(
          0,
          String(props.destination).length - 15
        )}
      </Text>
      <Text style={[styles.textColor, { top: 20, left: 40 }]}>
        Arriving at {props.dateandtime}
      </Text>
    </TouchableOpacity>
  );
};

function activeTime(input) {
  var ampm = "am";
  var firstPart = input.substring(0, 2).replace("0", "");
  var secondPart = input.substring(3, 5);

  if (firstPart == 12) {
    ampm = "pm";
  } else if (firstPart == 0) {
    firstPart = "12";
    ampm = "am";
  } else if (firstPart > 12) {
    firstPart = firstPart % 12;
    ampm = "pm";
  }

  return firstPart + ":" + secondPart + ampm;
}

export default function EventHolder() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#07526b", height: "100%" }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            height: 20,
            borderRadius: 10,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#93B7BE",
            borderColor: "white",
            left: "85%",
            position: "absolute",
            top: 20,
          }}
          onPress={() => navigation.navigate("Scheduler")}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              textAlign: "center",
              bottom: 2,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            borderWidth: 1,
            height: 20,
            borderRadius: 10,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#93B7BE",
            borderColor: "white",
            left: "5%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              textAlign: "center",
              bottom: 1,
            }}
          >
            edit
          </Text>
        </TouchableOpacity> */}
        <View style={{ marginTop: 40 }}>
          {storedinfo.storedList !== null &&
            storedinfo.storedList["_W"].map((num, key) => (
              <EventView
                key={key}
                title={storedinfo.storedList["_W"][key].name}
                origin={storedinfo.storedList["_W"][key].from_name}
                destination={storedinfo.storedList["_W"][key].to_name}
                dateandtime={
                  activeTime(storedinfo.storedList["_W"][key].time) +
                  ", " +
                  storedinfo.storedList["_W"][key].date
                }
                duration={storedinfo.storedList["_W"][key].duration}
                plotline={storedinfo.storedList["_W"][key].polyline}
                num={key}
              />
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          height: 20,
          borderRadius: 10,
          width: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#93B7BE",
          borderColor: "white",
          left: "5%",
          position: "absolute",
          top: "95%",
        }}
        onPress={() => {
          const auth = getAuth();
          console.log("signed out:", auth.currentUser.email);

          signOut(auth)
            .then(() => {
              navigation.navigate("SignIn");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 12,
            textAlign: "center",
            bottom: 1,
          }}
        >
          signout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: "black",
    borderColor: "black",
  },
});
