import * as React from "react";
import {Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import { useState, useEffect } from "react";
import { authentication } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";



const SignIn = () => {
   const [isSignedIn, setIsSignedIn] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   
   const navigation = useNavigation()
   useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(user => {
      if (user){
        navigation.navigate("EventHolder")
      }
    })

    return unsubscribe
   }, [])

   const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log('Registered User:', user.email);
      setIsSignedIn(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log([errorCode, errorMessage])
    }) 
  }

  // const gotoSignUp = () => {

  //   const navigation = useNavigation(){

  //   }
    
  // }

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log('Logged in User:', user.email)
      setIsSignedIn(true)
    })
    .catch(error => alert(error.message)) 
  }  
    
    return (
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior="padding">
            <View style={styles.inputContainer}>
              <View style={styles.logoContainer}><Text style={styles.logo}> Movin </Text></View>
              <TextInput 
                placeholder="Email"            
                value={email} 
                onChangeText={text => setEmail(text)} 
                style={styles.input}/>
              <TextInput 
              placeholder="Password" 
              value={password} 
              onChangeText={text => setPassword(text)} 
              style={styles.input}
              secureTextEntry/>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.buttonText}> Login </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}> SignUp</Text>
              </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C195'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    width: '80%',
  },
  input:{
    backgroundColor: '#C5FCF1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline:{
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText:{
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  logo:{
    fontSize:29,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 45,
    marginHorizontal: 69,
  },
})



export default SignIn;