import React, { useState, useEffect } from "react";
import { authentication } from "../firebase/firebase";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function LoginPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        const db = getFirestore();
        setDoc(doc(db, "users", user.email), {});

        console.log("ehlo");

        navigation.navigate("EventHolder");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered User:", user.email);
        setIsSignedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log([errorCode, errorMessage]);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in User:", user.email);
        setIsSignedIn(true);
      })
      .catch((error) => alert(error.message));
  };
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
          Movin
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
          secureTextEntry
        />
        <View style={{ top: 40, width: 150 }}>
          <Button title="Sign in" onPress={handleSignIn} />
          <View style={{ top: 20 }}>
            <Button title="Sign up" onPress={handleSignUp} />
          </View>
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
