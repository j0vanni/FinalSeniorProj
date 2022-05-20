import { Alert, Appearance, StyleSheet, Text, View } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Polyline,
  Circle,
  Geojson,
} from "react-native-maps";
import { React, Component } from "react";
import { decode } from "@googlemaps/polyline-codec";
import storedinfo from "../storedinfo";

function Map({ route }) {
  const { plotline, number, fromname, toname } = route.params;
  const encoded = plotline;

  const path = decode(encoded, 5);

  var pathMapping = [];

  for (let i = 0; i < path.length; i++) {
    pathMapping[i] = { latitude: path[i][0], longitude: path[i][1] };
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      style={styles.map}
      scrollEnabled={true}
      region={{
        latitude: path[0][0],
        longitude: path[0][1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Polyline coordinates={pathMapping} strokeWidth={5} />
      <Marker coordinate={{ latitude: path[0][0], longitude: path[0][1] }}>
        <Callout>
          <Text>{fromname}</Text>
        </Callout>
      </Marker>
      <Marker
        coordinate={{
          latitude: path[path.length - 1][0],
          longitude: path[path.length - 1][1],
        }}
      >
        <Callout>
          <Text>{toname}</Text>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: "100%",
  },
});

export default Map;
