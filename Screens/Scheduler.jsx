import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import storedinfo from "../storedinfo";
import DateTimePicker from "@react-native-community/datetimepicker";

const APIKEY = "AIzaSyAOkb1qfug4ZbKWWsJC7393qBL7N6RKq9w";
var infojson;

const Searchbar = ({ styles, location, title }) => {
  const [rawuserinput, setRUI] = useState("");
  const [show, setShow] = useState(false);
  const [destnum, setDestinationNum] = useState();
  const [finalinfo, setIF] = useState("");

  function sendTo(location, response) {
    if (location == "from") {
      storedinfo.fromdata = response;
    } else if (location == "to") {
      storedinfo.todata = response;
    }
  }

  function getChosen(location, input) {
    if (location == "from") {
      storedinfo.fromchosen = input;
      setIF(storedinfo.fromdata.predictions[storedinfo.fromchosen].description);
    } else if (location == "to") {
      storedinfo.tochosen = input;
      setIF(storedinfo.todata.predictions[storedinfo.tochosen].description);
    }

    console.log(storedinfo.fromchosen, storedinfo.tochosen);
  }

  function getplaceInfo(userinput) {
    var iurl =
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
      userinput.replace(" ", "+") +
      "&types=geocode&rank_by=distance&key=" +
      APIKEY;

    console.log(iurl);

    axios({ method: "get", url: iurl, responseType: "json" }).then(
      (response) => {
        infojson = response.data;
        setShow(true);
        sendTo(location, infojson);

        for (let i = 0; i < infojson.predictions.length; i++) {
          console.log(infojson.predictions[i].description);
          console.log(infojson.predictions[i].place_id);
        }
      }
    );
  }

  function Showlocations(infoinput) {
    function combine(num) {
      getChosen(location, num);
      setShow(false);
      setDestinationNum(num);
    }
    if (infojson != undefined && show) {
      return (
        <View>
          {infojson.predictions.map((item, key) => (
            <TouchableOpacity
              onPress={() => combine(key)}
              key={key}
              style={{
                borderWidth: 1,
                width: "90%",
                borderRadius: 5,
                padding: 5,
                backgroundColor: "#6a737a",
              }}
            >
              <Text style={{ color: "white" }}>
                {infojson.predictions[key].description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  const ontextChange = () => setShow(false);

  return (
    <View style={styles}>
      <TextInput
        style={{
          height: 35,
          borderWidth: 1,
          width: "90%",
          borderRadius: 5,
          backgroundColor: "white",
          paddingLeft: 10,
        }}
        onEndEditing={() => getplaceInfo(rawuserinput)}
        onChangeText={(text) => {
          ontextChange();
          setRUI(text);
          setIF(text);
          //getplaceInfo(rawuserinput);
        }}
        value={finalinfo}
        placeholder={title}
      />

      <Showlocations />
    </View>
  );
};

export default function Scheduler() {
  const [arriveordepart, setAOD] = useState("arrival_time");
  const [travelingTime, setTTime] = useState("");
  const [arriveColor, setArriveColor] = useState("#2296f3");
  const [departColor, setDepartColor] = useState("#6a737a");
  const [eventTitle, setTitle] = useState("");
  const [displayTime, setDisplay] = useState(false);

  const [date, setDate] = useState(new Date());
  storedinfo.time = date;

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    storedinfo.time = date;
    console.log(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
    if (storedinfo.fromchosen != null && storedinfo.tochosen != null) {
      usedirectionsAPI();
      setDisplay(true);
    }
  };

  function usedirectionsAPI() {
    var placeidfrom =
      storedinfo.fromdata.predictions[storedinfo.fromchosen].place_id;
    var placeidto = storedinfo.todata.predictions[storedinfo.tochosen].place_id;
    var iurl =
      "https://maps.googleapis.com/maps/api/directions/json?origin=place_id:" +
      placeidfrom +
      "&destination=place_id:" +
      placeidto +
      "&" +
      arriveordepart +
      "=" +
      Math.floor(storedinfo.time / 1000) +
      "&mode=transit&key=" +
      APIKEY;

    axios({ method: "get", url: iurl, responseType: "json" }).then(
      (response) => {
        console.log(response.data);
        storedinfo.storedJSON = response.data;
        setTTime(storedinfo.storedJSON.routes[0].legs[0].duration.text);
      }
    );
  }

  function activeTime(input) {
    var ampm = "am";
    var firstPart = input.substring(0, 2).replace("0", "");
    var secondPart = input.substring(3, 5);
    storedinfo.time.toLocaleTimeString().substring(0, 2);

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

  useEffect(() => {
    if (storedinfo.fromchosen != null && storedinfo.tochosen != null) {
      //usedirectionsAPI();
      setDisplay(true);
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#07526b" }}>
      <View>
        <TouchableOpacity
          style={{
            top: 30,
            left: 275,
            width: 100,
            paddingTop: 10,
            paddingBottom: 10,
          }}
          onPress={() => console.log("cancel")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={[
            styles.textinput,
            { top: 105, backgroundColor: "white", padding: 10 },
          ]}
          onChangeText={setTitle}
          placeholder="event name"
        />
        <Searchbar
          styles={{ top: 115, left: "5%", marginBottom: 10 }}
          location="from"
          title="origin"
        />
        <Searchbar
          styles={{ top: 130, left: "5%", marginBottom: 10 }}
          location="to"
          title="destination"
        />
        <View style={{ alignItems: "center" }}>
          <View style={styles.arrivedepart}>
            <View
              style={[
                styles.arrive,
                {
                  backgroundColor: arriveColor,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonarrivedepart}
                onPress={() => {
                  setAOD("arrival_time");
                  setArriveColor("#2296f3");
                  setDepartColor("#6a737a");
                  if (
                    storedinfo.fromchosen != null &&
                    storedinfo.tochosen != null &&
                    !displayTime
                  ) {
                    usedirectionsAPI();
                    setDisplay(true);
                  }
                }}
              >
                <Text style={{ color: "white" }}>Arrive</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.depart,
                {
                  backgroundColor: departColor,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonarrivedepart}
                onPress={() => {
                  setAOD("departure_time");
                  setArriveColor("#6a737a");
                  setDepartColor("#2296f3");
                }}
              >
                <Text style={{ color: "white" }}>Depart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ top: 200, alignItems: "center" }}>
          <View>
            <View style={{ width: 150 }}>
              <Button onPress={showDatepicker} title="Set Date" />
            </View>
            <View style={{ top: 20, width: 150 }}>
              <Button onPress={showTimepicker} title="Set Time" />
            </View>

            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                onChange={onChange}
                style={{ alignItems: "center" }}
              />
            )}
          </View>
          {displayTime && storedinfo.storedJSON != null && (
            <View>
              <Text style={[styles.text, { top: 50, left: "0%" }]}>
                Travel time: {travelingTime}
              </Text>
              <Text style={[styles.text, { top: 60, left: 18 }]}>
                at {storedinfo.time.toLocaleDateString()},{" "}
                {activeTime(storedinfo.time.toLocaleTimeString())}
              </Text>
            </View>
          )}
        </View>
        <View style={{ top: 300, alignItems: "center" }}>
          <Button
            title="Add to events"
            onPress={() => {
              usedirectionsAPI();
              storedinfo.event_name = eventTitle;
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { left: "5%", color: "white", fontWeight: "bold" },
  inputBox: { backgroundColor: "white" },
  textinput: {
    height: 35,
    borderWidth: 1,
    width: "90%",
    left: "5%",
    borderRadius: 5,
    marginBottom: 10,
  },
  aodholder: { alignItems: "center", top: 300, lineHeight: 10 },
  arrivedepart: {
    width: "90%",
    borderWidth: 1,
    top: 160,
    height: 40,
    flexDirection: "row",
    borderRadius: 10,
  },
  arrive: {
    flex: 1,
  },
  depart: {
    flex: 1,
  },
  buttonarrivedepart: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
});
