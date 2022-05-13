import React, { useState, useEffect } from "react";
import { authentication } from "../firebase/firebase";
import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import storedinfo from "../storedinfo";
import {
  collection,
  doc,
  getFirestore,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

async function loadDB() {
  var list = [];
  var num = 0;
  const auth = getAuth();
  const db = getFirestore();

  const queryList = await getDocs(collection(db, auth.currentUser.email));
  queryList.forEach((doc) => {
    list[num] = doc.data();
    num++;
  });

  return list;
}

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
        storedinfo.storedList = loadDB();

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
        <Image
          source={require("../logo.png")}
          style={{ width: 75, height: 75, borderRadius: 10 }}
        />
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
