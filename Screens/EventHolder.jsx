import React, { useEffect, useReducer } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const EventView = (props) => {
  return (
    <View
      style={{
        backgroundColor: "#93B7BE",
        width: "90%",
        height: 140,
        left: 20,
        borderRadius: 10,
        marginBottom: 10,
      }}
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
        Origin: {props.origin}
      </Text>
      <Text style={[styles.textColor, { top: 7, left: 220 }]}>
        {props.duration}
      </Text>
      <Text style={[styles.textColor, { top: 10, left: 5 }]}>
        Destination: {props.destination}
      </Text>
      <Text style={[styles.textColor, { top: 20, left: 40 }]}>
        Arriving at {props.dateandtime}
      </Text>
    </View>
  );
};

export default function EventHolder() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView
        style={{ backgroundColor: "#07526b", height: "100%", paddingTop: 50 }}
      >
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
        </TouchableOpacity>
        <View style={{ top: 10 }}>
          <EventView
            title="ur mom"
            origin="home"
            duration="ur mom"
            destination="ur moms home"
            dateandtime="1 hr"
          />
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
