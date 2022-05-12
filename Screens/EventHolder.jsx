import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

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
  return (
    <SafeAreaView>
      <ScrollView
        style={{ backgroundColor: "#07526b", height: "100%", paddingTop: 50 }}
      >
        <EventView
          title="ur mom"
          origin="home"
          duration="ur mom"
          destination="ur moms home"
          dateandtime="1 hr"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: "black",
    borderColor: "black",
  },
});
