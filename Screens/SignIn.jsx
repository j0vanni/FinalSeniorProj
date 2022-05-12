import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <View
        style={{
          paddingTop: 160,
          alignItems: "center",
          backgroundColor: "#07526b",
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          Sign up
        </Text>
        <TextInput
          style={styles.textinput}
          onChangeText={setEmail}
          placeholder="email"
        />
        <TextInput
          style={styles.textinput}
          onChangeText={setPassword}
          placeholder="password"
        />
        <View style={{ top: 40, width: 150 }}>
          <Button
            title="Sign up"
            onPress={() => {
              console.log(email);
              console.log(password);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    height: 35,
    borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: "white",
  },
});
